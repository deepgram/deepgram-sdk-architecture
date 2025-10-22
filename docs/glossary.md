# Glossary

| Term / Acronym        | Definition                                                                                                  |
|-----------------------|-------------------------------------------------------------------------------------------------------------|
| **Fern**              | Code generation platform used to produce strongly typed SDKs from Deepgram’s API specifications.            |
| **API Spec**          | The OpenAPI + AsyncAPI documents in `deepgram-api-specs` representing every public Deepgram endpoint.       |
| **Generated Layer**   | Files emitted by Fern (base clients, service clients, models, errors, transports).                          |
| **Hand-Written Layer**| Language-specific code that extends the generated layer (entrypoints, telemetry, helpers).                  |
| **Base Client**       | Generated class that configures the HTTP/WebSocket transport and exposes service modules lazily.            |
| **Client Wrapper**    | Fern construct that holds shared headers, environment configuration, and the underlying HTTP client.        |
| **Telemetry Handler** | Interface that receives structured HTTP/WebSocket events for batching and export.                           |
| **Instrumentation**   | Wrappers around transports that invoke telemetry handlers without altering generated code paths.            |
| **Session ID**        | UUID added to request headers (`x-deepgram-session-id`) to correlate telemetry and support interactions.    |
| **Environment Enum**  | Generated enumeration representing API base URLs (production, staging, custom).                             |
| **Request Options**   | Per-call overrides (timeout, retries, headers) supported by Fern transports.                                |
| **Auth Token**        | Short-lived bearer token issued via Deepgram Auth APIs for delegated access.                                |
| **API Key**           | Long-lived credential managed in the Deepgram console, used by default when instantiating clients.          |
| **Self-Hosted**       | Deployment mode where Deepgram runs inside customer-controlled infrastructure or air-gapped appliances.     |
