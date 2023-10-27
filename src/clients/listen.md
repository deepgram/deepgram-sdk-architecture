# Listen

This is the listen client. It's purpose is to expose the different types of `listen` requests that users can make as properties on the class. Relevant to languages that conform to a call stack for e.g. `deepgram.listen.live()`.

## Imported by

- [client](../client.md)

## Imported files

- [prerecorded](./prerecorded.md)
- [live](./live.md)

## Requirements

- requires an API key
  - if no API key, default to Deepgram enviroment variable API key (`DEEPGRAM_API_KEY`)
- requires client options
  - scoped/namespaced options
- exports prerecorded and live clients
