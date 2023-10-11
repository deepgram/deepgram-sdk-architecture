# ListenClient

This is the listen client. It's purpose is to expose the different types of `listen` requests that users can make as properties on the class.

## Imported by

- [DeepgramClient](../DeepgramClient.md)

## Imported files

- [PrerecordedClient](./PrerecordedClient.md)
- [LiveClient](./LiveClient.md)

## Descriptive language

- class `ListenClient`

  - `constructor` (initialiser) - accepts `baseUrl` string or URL object, `headers` object, `key` string

    - store `baseUrl`, `headers`, and `key` string as class properties

  - `prerecorded` class property

    - return new instance of `PrerecordedClient`

  - `live` class function - accepts live transcription options

    - return new instance of `LiveClient`

- export `ListenClient`

## Node SDK example

```ts
// ... other utility imports ...
import { PrerecordedClient } from "./PrerecordedClient";
import { LiveClient } from "./LiveClient";

export class ListenClient {
  constructor(baseUrl, headers, key) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.key = key;
  }

  // deepgram.listen.prerecorded
  get prerecorded() {
    return new PrerecordedClient(this.baseUrl, this.headers, this.key);
  }

  // deepgram.listen.live({ ...opts })
  public live(options, endpoint = "v1/listen") {
    return new LiveClient(this.baseUrl, this.key, options, endpoint);
  }
}
```
