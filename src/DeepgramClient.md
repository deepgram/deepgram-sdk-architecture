# DeepgramClient

This is the main client. It will expose the product clients as properties on the class.

## Imported by

- [index](./index.md)

## Imported files

- [ListenClient](./clients/ListenClient.md)
- [ManageClient](./clients/ManageClient.md)
- [OnPremClient](./clients/OnPremClient.md)

## Descriptive language

- class `DeepgramClient`

  - `constructor` (initialiser) - accepts `apiKey` string and client `options` object

    - `apiKey` is NOT required

    - if no `apiKey`

      - check for the `DEEPGRAM_API_KEY` environment variable

    - error if no `apiKey` and no `DEEPGRAM_API_KEY`

    - store the API key we end up with as a class property

    - get `settings` object based on `options`. prefill `settings` using defaults, before applying the user supplied `options`.

    - error if there is no `url` from the resulting settings `settings`

    - always ensure the `url` is stored as `http://` or `https://`, never store a `www.` string without the protocol

    - strip `url` slashes

    - by now, `url` should **ALWAYS** be `http://example.com` or `https://example.com` style URLs, with a protocol and no trailing slash.

    - store the `url` as a class property

  - `listen` class property

    - return new instance of `ListenClient`

  - `manage` class property

    - return new instance of `ManageClient`

  - `onprem` class property

    - return new instance of `OnPremClient`

- export `DeepgramClient`

## Node SDK example

```ts
import { applySettingDefaults, stripTrailingSlash } from "./lib/helpers";
import { DEFAULT_URL, DEFAULT_OPTIONS } from "./lib/constants";
import { ListenClient } from "./packages/ListenClient";
import { ManageClient } from "./packages/ManageClient";
import { OnPremClient } from "./packages/OnPremClient";

export default class DeepgramClient {
  protected key: string;
  protected baseUrl: URL;
  protected headers: Record<string, string>;

  constructor(
    protected apiKey: string,
    options: DeepgramClientOptions | undefined = DEFAULT_OPTIONS
  ) {
    this.key = apiKey;

    if (!apiKey) {
      this.key = process.env.DEEPGRAM_API_KEY as string;
    }

    if (!this.key) {
      if (!apiKey) throw new Error("A deepgram API key is required");
    }

    const settings = applySettingDefaults(options, DEFAULT_OPTIONS);

    if (!settings.global.url) {
      throw new Error(
        `An API URL is required. It should be set to ${DEFAULT_URL} by default. No idea what happened!`
      );
    }

    let url = settings.global.url;

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    this.baseUrl = new URL(stripTrailingSlash(url));
    this.headers = settings.global?.headers ?? {};
  }

  get listen(): ListenClient {
    return new ListenClient(this.baseUrl, this.headers, this.key);
  }

  get manage(): ManageClient {
    return new ManageClient(this.baseUrl, this.headers, this.key);
  }

  get onprem(): OnPremClient {
    return new OnPremClient(this.baseUrl, this.headers, this.key);
  }
}
```
