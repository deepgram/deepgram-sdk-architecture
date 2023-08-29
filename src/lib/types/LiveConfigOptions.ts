// Configuration options for live transcription settings
// This interface defines the configuration options that can be used when setting up live transcription using the LiveClient class. The numerals option can be used to control whether the system recognizes numerals (numbers) during transcription.

// Define the LiveConfigOptions interface to represent configuration options for live transcription
export interface LiveConfigOptions {
  // Whether to enable or disable the recognition of numerals (numbers)
  numerals?: boolean;
}
