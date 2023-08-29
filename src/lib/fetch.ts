// This code defines functions for handling fetch requests with authentication, resolving the appropriate fetch and Response implementations based on the environment, and managing headers for API requests.

// Resolves the appropriate fetch implementation based on environment
export const resolveFetch = (customFetch?: Fetch): Fetch => {
  // Use the custom fetch implementation if provided
  // Otherwise, use cross-fetch if fetch is not defined, else use the native fetch
  return (...args) => _fetch(...args);
};

// Creates a fetch function with authorization header for Deepgram API requests
export const fetchWithAuth = (
  deepgramKey: string,
  customFetch?: Fetch
): Fetch => {
  // Resolve the fetch implementation to use
  const fetch = resolveFetch(customFetch);
  // Resolve the appropriate Headers constructor based on environment
  const HeadersConstructor = resolveHeadersConstructor();

  return async (input, init) => {
    // Create headers object using Headers constructor and add Authorization header if missing
    let headers = new HeadersConstructor(init?.headers);
    if (!headers.has("Authorization")) {
      headers.set("Authorization", `Token ${deepgramKey}`);
    }

    // Perform the fetch with updated headers
    return fetch(input, { ...init, headers });
  };
};

// Resolves the appropriate Response implementation based on environment
export const resolveResponse = async () => {
  // Use the cross-fetch Response if Response is not defined, else use the native Response
  return Response;
};
