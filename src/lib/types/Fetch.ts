// Definition of fetch-related types and options
// These types and interfaces help define and describe the parameters and options used in the fetch requests made by the Deepgram SDK.

// Define the Fetch type based on the global fetch function
export type Fetch = typeof fetch;

// Define options that can be passed to fetch requests
export interface FetchOptions {
  headers?: {
    [key: string]: string;
  };
  noResolveJson?: boolean; // Option to skip resolving the response JSON
}

// Define types for different request methods
export type RequestMethodType = "GET" | "POST" | "PUT" | "DELETE";

// Define parameters that can be passed to fetch requests
export interface FetchParameters {
  /**
   * Pass in an AbortController's signal to cancel the request.
   */
  signal?: AbortSignal;
}
