# LiveClient

This is the live client. It's purpose is to connect to the Deepgram websocket, store the connection as a private property, enable sending events, and to emit events based

## Imported by

- [ListenClient](./ListenClient.md)

## Imported files

- [LiveTranscriptionEvents](../libs/enums/LiveTranscriptionEvents.md)
- [LiveTranscriptionState](../libs/enums/LiveTranscriptionState.md)

## Descriptive language

- class `LiveClient` extends or implements a `generic built-in event emitter` class

  - `constructor` - accepts `baseUrl` string or URL object, `key` string, and live transcription options

    - immediately connects to Deepgram websocket using the `baseUrl` and `apiKey`

    - store websocket connection against the class

    - set up listeners for deepgram events from the stored websocket connection

      - `open` - emit `op` event

      - `close` - emit `close` event

      - `error` - emit `error` event with details

      - `message` can be JSON with property `type=Results` - emit a transcription event with parsed JSON (not string)

      - `message` can be JSON with property `type=Metadata` - emit a metadata event with parsed JSON (not string)

  - `getReadyState`

    - fetches the ready state of the stored websocket connection.

  - `configure` - update connection config (only available for `numerals` right now)

    - sends `{ type: "Configure", processors: { numbers: true|false } }` to the stored websocket connection.

  - `keepAlive`

    - sends `{ type: "KeepAlive" }` to the stored websocket connection.

  - `send`

    - sends raw data to the stored websocket connection.

  - `finish`

    - sends `{ type: "CloseStream" }` to the stored websocket connection.

- export `LiveClient`

## Node SDK example

```ts
import { EventEmitter } from "events";
import { appendSearchParams, isBrowser } from "../lib/helpers";
import WebSocket from "modern-isomorphic-ws";
import { LiveConnectionState, LiveTranscriptionEvents } from "../lib/enums";
import type {
  LiveOptions,
  LiveConfigOptions,
  LiveMetadataEvent,
  LiveTranscriptionEvent,
} from "../lib/types";
import { DEFAULT_HEADERS } from "../lib/constants";

export class LiveClient extends EventEmitter {
  private _socket: WebSocket;

  constructor(baseUrl: URL, apiKey: string, options: LiveOptions, endpoint = "v1/listen") {
    super();

    // use `options` and `baseUrl` to build a URL with queryparams

    this._socket = // isomorphic websocket connection (so it works in Browser and Node.JS)

    // setup the socket events
    this._socket.onclose = (event: WebSocket.CloseEvent) => {
      this.emit(LiveTranscriptionEvents.Close, event);
    };

    this._socket.onerror = (event) => {
      this.emit(LiveTranscriptionEvents.Error, event);
    };

    // determine whether the response was metadata or transcription and emit an appropriate event
    this._socket.onmessage = (event) => {
      try {
        const data: any = JSON.parse(event.data.toString());

        if (data.type === LiveTranscriptionEvents.Metadata) {
          this.emit(LiveTranscriptionEvents.Metadata, data as LiveMetadataEvent);
        }

        if (data.type === LiveTranscriptionEvents.Transcript) {
          this.emit(LiveTranscriptionEvents.Transcript, data as LiveTranscriptionEvent);
        }
      } catch (error) {
        this.emit(LiveTranscriptionEvents.Error, {
          event,
          message: "Unable to parse `data` as JSON.",
          error,
        });
      }
    };
  }

  // get the state of the websocket connection
  public getReadyState(): LiveConnectionState {
    return this._socket.readyState;
  }

  // send a configure request
  public configure(config: LiveConfigOptions): void {
    this._socket.send(
      JSON.stringify({
        type: "Configure",
        processors: config,
      })
    );
  }

  // send a keepalive request
  public keepAlive(): void {
    this._socket.send(
      JSON.stringify({
        type: "KeepAlive",
      })
    );
  }

  /**
   * Sends data to the Deepgram API via websocket connection
   * @param data Audio data to send to Deepgram
   *
   * Conforms to RFC #146 - does not send an empty byte.
   * @see https://github.com/deepgram/deepgram-python-sdk/issues/146
   */
  public send(data: string | ArrayBufferLike | ArrayBufferView): void {
    if (this._socket.readyState === LiveConnectionState.OPEN) {
      if (typeof data === "string") {
        this._socket.send(data); // send text data
      } else {
        if (data.byteLength > 0) {
          this._socket.send(data); // send buffer when not zero-byte
        } else {
          this.emit(
            LiveTranscriptionEvents.Warning,
            "Zero-byte detected, skipping. Send `CloseStream` if trying to close the connection."
          );
        }
      }
    } else {
      this.emit(LiveTranscriptionEvents.Error, "Could not send. Connection not open.");
    }
  }

  /**
   * Denote that you are finished sending audio and close
   * the websocket connection when transcription is finished
   */
  public finish(): void {
    // tell the server to close the socket
    this._socket.send(
      JSON.stringify({
        type: "CloseStream",
      })
    );

    // close the socket from the client end
    if (this._socket.readyState === LiveConnectionState.OPEN) {
      this._socket.close();
    }
  }
}
```
