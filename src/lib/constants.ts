// Constants and defaults used throughout the SDK

// Default headers for API requests
export const DEFAULT_HEADERS = {
  // Information about the client, version, and environment
  "X-Client-Info": `@deepgram/sdk; ${
    isBrowser() ? "browser" : "server"
  }; v${version}`,
  // User-Agent header for identifying the SDK version
  "User-Agent": `@deepgram/sdk/${version}`,
  // Content-Type header for JSON requests
  "Content-Type": "application/json",
};

// Default API URL
export const DEFAULT_URL = "api.deepgram.com";

// Default global options for the SDK
export const DEFAULT_GLOBAL_OPTIONS = {
  // Default API URL
  url: DEFAULT_URL,
  // Default headers for API requests
  headers: DEFAULT_HEADERS,
};

// Default options for the SDK
export const DEFAULT_OPTIONS = {
  // Default global options
  global: DEFAULT_GLOBAL_OPTIONS,
};
