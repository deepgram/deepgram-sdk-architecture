// Enum for live transcription events
// This enum provides symbolic names for different events that can occur during a live transcription session. These events can be used to listen for and handle various aspects of the transcription process, such as when the connection is opened, closed, when a transcript is received, or when an error occurs.

// Define the LiveTranscriptionEvents enum to represent different events in a live transcription session
export enum LiveTranscriptionEvents {
  // The event fired when the connection is opened
  Open = "open",

  // The event fired when the connection is closed
  Close = "close",

  // The event fired when a transcript is received
  TranscriptReceived = "transcriptReceived",

  // The event fired when an error occurs
  Error = "error",
}
