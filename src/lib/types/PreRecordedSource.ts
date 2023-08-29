// Different types of prerecorded audio sources
// These types and interfaces define different ways audio data can be provided to the transcription service. It can be either a URL source, a buffer source (for in-memory data), or a readable stream source. Each source type is associated with the relevant audio data and its mimetype.

// Define the possible types of sources for prerecorded audio
export type PrerecordedSource = UrlSource | BufferSource | ReadStreamSource;

// Define the possible types of sources for file-based transcription
export type FileSource = BufferSource | ReadStreamSource;

// Interface for representing a source of audio data as a readable stream along with its mimetype
export interface ReadStreamSource {
  stream: Readable; // Readable stream containing audio data
  mimetype: string; // Mimetype of the audio data
}

// Interface for representing a URL-based audio source
export interface UrlSource {
  url: string; // URL of the audio source
}

// Interface for representing a buffer-based audio source along with its mimetype
export interface BufferSource {
  buffer: Buffer; // Buffer containing audio data
  mimetype: string; // Mimetype of the audio data
}
