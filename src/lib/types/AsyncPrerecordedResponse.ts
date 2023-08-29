// Definitions for asynchronous prerecorded response
// This interface defines the structure of the response you'll receive when making asynchronous prerecorded requests. It includes the request_id property, which represents the unique identifier for the request.

// Define the AsyncPrerecordedResponse interface to represent the response for asynchronous prerecorded requests
export interface AsyncPrerecordedResponse {
  // The unique identifier for the request
  request_id: string;
}
