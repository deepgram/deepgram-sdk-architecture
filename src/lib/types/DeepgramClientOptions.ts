// Configuration options for the Deepgram client
// This interface defines the configuration options for initializing the Deepgram client, allowing you to customize the fetch implementation, WebSocket class, headers, and the URL used to interact with different Deepgram environments.

// Define the DeepgramClientOptions interface to configure the Deepgram client
export interface DeepgramClientOptions {
  global: {
    /**
     * A custom `fetch` implementation.
     */
    fetch?: Fetch;

    /**
     * A custom `ws` class.
     */
    ws?: WebSocket;

    /**
     * Optional headers for initializing the client.
     */
    headers?: Record<string, string>;

    /**
     * The URL used to interact with production, On-prem and other Deepgram environments.
     * Defaults to `api.deepgram.com`.
     */
    url?: string;
  };
}
