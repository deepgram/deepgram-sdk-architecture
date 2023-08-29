// The helpers.ts file provides functions for various tasks like manipulating URLs, headers, and options, as well as checking source types. These utility functions streamline operations within the SDK.

// Removes trailing slash from a URL
export function stripTrailingSlash(url: string): string;

// Checks if the code is running in a browser environment
export const isBrowser: () => boolean;

// Merges provided options with default options
export function applySettingDefaults(
  options: DeepgramClientOptions,
  defaults: DeepgramClientOptions
): DeepgramClientOptions;

// Appends query parameters from transcription options to a URLSearchParams object
export function appendSearchParams(
  searchParams: URLSearchParams,
  options: TranscriptionOptions
): void;

// Resolves the appropriate Headers constructor based on environment
export const resolveHeadersConstructor: () => typeof Headers;

// Creates WebSocket instance with authorization headers
export const wsWithAuth: (
  deepgramKey: string,
  customWs?: WebSocket
) => (url: string, options: any) => WebSocket;

// Checks if provided source is a URLSource, BufferSource, or ReadStreamSource
export const isUrlSource: (providedSource: PrerecordedSource) => boolean;

export const isBufferSource: (providedSource: PrerecordedSource) => boolean;

export const isReadStreamSource: (providedSource: PrerecordedSource) => boolean;
