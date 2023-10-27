# Live

This is the live client. It's purpose is to connect to the Deepgram websocket, send messages to the websocket, and listen for responses.

## Imported by

- [listen](./listen.md)

## Requirements

- connect to the websocket
- allow raw audio/video data to be sent
- allow for the following text data to be sent
  - type: CloseStream
  - type: KeepAlive
  - type: Configure
- listen for the following responses
  - message
    - type: Results
    - type: Metadata
  - open
  - close
  - error
