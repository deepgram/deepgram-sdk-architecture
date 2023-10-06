# Entrypoint

This is the top-most file in a project. Sometimes known as `index.js`, `index.ts`, `main.py`.

## Imported files

- [DeepgramClient](./DeepgramClient.md)

## Descriptive language

- function `createClient` - accepts `apiKey` string and client `options` object

  - return new instance of `DeepgramClient`

- export `createClient`

## Node SDK example

```ts
import DeepgramClient from "./DeepgramClient";

export const createClient = (apiKey: string, options?: DeepgramClientOptions): DeepgramClient => {
  return new DeepgramClient(apiKey, options);
};
```
