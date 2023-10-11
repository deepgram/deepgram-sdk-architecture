# LiveClient

This is the live client. It's purpose is to connect to the Deepgram websocket, store the connection as a private property, enable sending events, and to emit events based

## Imported by

- [ListenClient](./ListenClient.md)

## Imported files

- generic built-in event emitter?

## Descriptive language

- class `LiveClient` extends or implements a built-in event emitter class

  - `constructor` - accepts `baseUrl` string or URL object, `key` string, and live transcription options

    - immediately connects to Deepgram websocket

    - store socket against cass

    - set up listeners for deepgram websocket events

      - `open` - emit `op` event

      - `close` - emit `close` event

      - `error` - emit `error` event with details

      - `message` can be JSON with property `type=Results` - emit a transcription event with parsed JSON (not string)

      - `message` can be JSON with property `type=Metadata` - emit a metadata event with parsed JSON (not string)

  - `configure` - update

  - `keepAlive`

  - `getReadyState`

  - `send`

  - `finish`

- export `LiveClient`

## Node SDK example

```ts
// ... other utility imports ...
import { AbstractRestfulClient } from "./AbstractRestfulClient";

export class LiveClient extends AbstractRestfulClient {

  // deepgram.listen.prerecorded.transcribeUrl(source, { ...opts })
  async transcribeUrl(source, options, endpoint = "v1/listen") {
    try {
      // all the checks and formatting and stuff

      // this.post comes from `AbstractRestfulClient`
      const result = await this.post(this.fetch as Fetch, url, body, {
        headers: this.headers,
      });

      return { result, error: null }; // result always formatted { result, error }
    } catch (error) {
      if (isDeepgramError(error)) {
        return { result: null, error }; // result always formatted { result, error }
      }

      throw error;
    }
  }

  // deepgram.listen.prerecorded.transcribeFile(source, { ...opts })
  async transcribeFile(source, options, endpoint = "v1/listen") {
    try {
      // all the checks and formatting and stuff

      // this.post comes from `AbstractRestfulClient`
      const result = await this.post(this.fetch as Fetch, url, body, {
        headers: this.headers,
      });

      return { result, error: null }; // result always formatted { result, error }
    } catch (error) {
      if (isDeepgramError(error)) {
        return { result: null, error }; // result always formatted { result, error }
      }

      throw error;
    }
  }

  // deepgram.listen.prerecorded.transcribeUrlCallback(source, callback, { ...opts })
  async transcribeUrlCallback(source, options, callback, endpoint = "v1/listen") {
    try {
      // all the checks and formatting and stuff

      // this.post comes from `AbstractRestfulClient`
      const result = await this.post(this.fetch as Fetch, url, body, {
        headers: this.headers,
      });

      return { result, error: null }; // result always formatted { result, error }
    } catch (error) {
      if (isDeepgramError(error)) {
        return { result: null, error }; // result always formatted { result, error }
      }

      throw error;
    }
  }

  // deepgram.listen.prerecorded.transcribeFileCallback(source, callback, { ...opts })
  async transcribeFileCallback(source, options, callback, endpoint = "v1/listen") {
    try {
      // all the checks and formatting and stuff

      // this.post comes from `AbstractRestfulClient`
      const result = await this.post(this.fetch as Fetch, url, body, {
        headers: this.headers,
      });

      return { result, error: null }; // result always formatted { result, error }
    } catch (error) {
      if (isDeepgramError(error)) {
        return { result: null, error }; // result always formatted { result, error }
      }

      throw error;
    }
  }
}

```
