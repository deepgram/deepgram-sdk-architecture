# Prerecorded

This is the prerecorded client. It's purpose is to allow users to run a synchronous or asynchronous transcription.

## Imported by

- [listen](./listen.md)

## Requirements

- extends abstract rest client
- requires an API key
  - if no API key, default to Deepgram enviroment variable API key (`DEEPGRAM_API_KEY`)
- requires client options
  - scoped/namespaced options
- contains transcribe URL method
- contains transcribe file method
- contains transcribe URL method for when a callback url is specified
- contains transcribe file method for when a callback url is specified
