// DeepgramClient Class
// This code defines the DeepgramClient class, which is the main entry point for interacting with the Deepgram API. The comments highlight the main steps in creating the client instance, handling options, and providing access to the ListenClient instance for making transcription requests.

export default class DeepgramClient {
  // Properties for API endpoint URL, fetch function, and headers
  protected url: URL;
  protected fetch?: Fetch;
  protected headers: Record<string, string>;

  // Constructor to initialize Deepgram API key and options
  constructor(
    protected deepgramKey: string,
    options: DeepgramClientOptions | undefined = DEFAULT_OPTIONS
  ) {
    // Validate and apply default options
    const settings = applySettingDefaults(options, DEFAULT_OPTIONS);

    // Create the API URL from settings
    this.url = new URL(stripTrailingSlash(url));
    this.headers = settings.global?.headers ?? {};
    this.fetch = fetchWithAuth(deepgramKey, settings.global?.fetch);
    // this.ws = wsWithAuth(deepgramKey, settings.global?.ws);
  }

  // Get the ListenClient instance
  get listen(): ListenClient {
    // Return a new instance of ListenClient with initialized properties
  }
}
