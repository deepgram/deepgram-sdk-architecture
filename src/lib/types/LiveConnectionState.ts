// Enum for live connection states
// This enum provides symbolic names for different states that a live connection can be in, such as connecting, open, closing, and closed. These states can be useful for understanding the state of a live transcription session.

// Define the LiveConnectionState enum to represent different states of a live connection
export enum LiveConnectionState {
  // The connection is in the process of connecting
  CONNECTING = 0,

  // The connection is open and active
  OPEN = 1,

  // The connection is in the process of closing
  CLOSING = 2,

  // The connection is closed
  CLOSED = 3,
}
