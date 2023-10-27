# Main Client

For languages that include a call stack notation, this is the main client. It will allow you to chain methods to select API functionality.

## Imported by

- [entrypoint](./index.md)

## Imported files

- [listen](./clients/listen.md)
  <!-- - [manage](./clients/manage.md) -->
  <!-- - [on-prem](./clients/onprem.md) -->

## Requirements

This might be an abstract class to inform on the instantiation of other clients.

- requires an API key
  - if no API key, default to Deepgram enviroment variable API key (`DEEPGRAM_API_KEY`)
- requires client options
  - scoped/namespaced options
