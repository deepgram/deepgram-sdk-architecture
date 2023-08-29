// This code block defines custom error classes for Deepgram-specific errors, checks for DeepgramError instances, and provides custom error classes for Deepgram API errors and unknown errors.

// Custom error class for Deepgram-specific errors
export class DeepgramError extends Error {
  protected __dgError = true;

  constructor(message: string) {
    super(message);
    this.name = "DeepgramError";
  }
}

// Checks if the given error is a DeepgramError instance
export function isDeepgramError(error: unknown): error is DeepgramError {
  return typeof error === "object" && error !== null && "__dgError" in error;
}

// Custom error class for Deepgram API errors
export class DeepgramApiError extends DeepgramError {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "DeepgramApiError";
    this.status = status;
  }

  // Returns a JSON representation of the error
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    };
  }
}

// Custom error class for unknown errors
export class DeepgramUnknownError extends DeepgramError {
  originalError: unknown;

  constructor(message: string, originalError: unknown) {
    super(message);
    this.name = "DeepgramUnknownError";
    this.originalError = originalError;
  }
}
