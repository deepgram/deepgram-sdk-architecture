# PrerecordedClient

This is the prerecorded client. It's purpose is to allow users to run a synchronous or asynchronous transcription.

## Imported by

- [ListenClient](./ListenClient.md)

## Imported files

- [AbstractRestfulClient}](./AbstractRestfulClient.md)

## Descriptive language

- class `PrerecordedClient` extends `AbstractRestfulClient`

  - `constructor` (see `AbstractRestfulClient`)

  - `transcribeUrl` class function - accepts a `urlSource`, and prerecorded transcription options

    - if `source` is not a valid URL source

      - raise exception (wrong source)

    - if callback is in options

      - raise exception (point them at the callback functions)

    - apply options as querystring params to the URL

    - set content-type header as JSON - for the request body

    - return transcription results

  - `transcribeFile` class function - accepts a `bufferSource` (or, optionally a file stream/`streamSource`), and prerecorded transcription options

    - if `source` is not a valid FILE source

      - raise exception (wrong source)

    - if callback is in options

      - raise exception (point them at the callback functions)

    - apply options as querystring params to the URL

    - set content-type header as JSON - for the request body

    - return transcription results

  - `transcribeUrlCallback` class function - accepts a `urlSource`, a `callback`, and prerecorded transcription options

    - if `source` is not a valid URL source

      - raise exception (wrong source)

    - if callback is in options

      - set `callback=<value>` in the prerecorded transcription options object

    - apply options as querystring params to the URL

    - set content-type header as JSON - for the request body

    - return async confirmation with `request_id` only

  - `transcribeFileCallback` class function - accepts a `urlSource`, a `callback`, and prerecorded transcription options

    - if `source` is not a valid FILE source

      - raise exception (wrong source)

    - if callback is in options

      - set `callback=<value>` in the prerecorded transcription options object

    - apply options as querystring params to the URL

    - set content-type header as JSON - for the request body

    - return async confirmation with `request_id` only

- export `PrerecordedClient`

## Node SDK example

```ts
// ... other utility imports ...
import { AbstractRestfulClient } from "./AbstractRestfulClient";

export class PrerecordedClient extends AbstractRestfulClient {

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
