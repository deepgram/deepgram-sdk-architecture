// AbstractRestfulClient Class
// This code defines the AbstractRestfulClient class, which serves as a base class for other API client classes. It provides methods to handle common API interactions like GET, POST, PUT, and DELETE requests while handling errors and building request parameters. The comments outline the key steps involved in each method's functionality.

export class AbstractRestfulClient {
  // Properties for API endpoint URL, headers, and custom fetch function
  protected url: URL;
  protected headers: Record<string, string>;
  protected fetch?: Fetch;

  // Constructor to initialize properties
  constructor(url: URL, headers: Record<string, string>, fetch?: Fetch) {
    // Set API endpoint URL, headers, and custom fetch function
  }

  // Get error message from an error object
  protected _getErrorMessage(err: any): string {
    // Extract error message from the provided error object
  }

  // Handle API error and reject the promise with appropriate error type
  protected async handleError(error: unknown, reject: (reason?: any) => void) {
    // Handle different types of errors and reject with appropriate error type
  }

  // Create request parameters based on method, options, parameters, and body
  protected _getRequestParams(
    method: RequestMethodType,
    options?: FetchOptions,
    parameters?: FetchParameters,
    body?: string | Buffer | Readable
  ) {
    // Prepare request parameters based on provided inputs
  }

  // Handle requests using provided fetcher function
  protected async _handleRequest(
    fetcher: Fetch,
    method: RequestMethodType,
    url: string | URL,
    options?: FetchOptions,
    parameters?: FetchParameters,
    body?: string | Buffer | Readable
  ): Promise<any> {
    // Make the request using fetcher function and handle response
  }

  // Perform GET request
  protected async get(
    fetcher: Fetch,
    url: string | URL,
    options?: FetchOptions,
    parameters?: FetchParameters
  ): Promise<any> {
    // Make GET request using _handleRequest
  }

  // Perform POST request
  protected async post(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    options?: FetchOptions,
    parameters?: FetchParameters
  ): Promise<any> {
    // Make POST request using _handleRequest
  }

  // Perform PUT request
  protected async put(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    options?: FetchOptions,
    parameters?: FetchParameters
  ): Promise<any> {
    // Make PUT request using _handleRequest
  }

  // Perform DELETE request
  protected async remove(
    fetcher: Fetch,
    url: string | URL,
    body: string | Buffer | Readable,
    options?: FetchOptions,
    parameters?: FetchParameters
  ): Promise<any> {
    // Make DELETE request using _handleRequest
  }
}
