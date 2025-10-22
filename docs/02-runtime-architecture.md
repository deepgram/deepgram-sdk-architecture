# Runtime Architecture

Every Deepgram SDK instantiates the same runtime building blocks. Generated Fern packages provide typed clients and
transport primitives, while hand-written layers add ergonomics, policy, and platform integrations.

## Generated Layer

Fern emits a language-specific package with the following components:

- **`BaseClient` / `AsyncBaseClient`** – lazily expose service groups (`listen`, `speak`, `manage`, `read`, `agent`,
  `auth`, `self_hosted`). They manage environment selection, API key propagation, request timeouts, and reusable HTTP
  clients.
- **Service Clients** – each service group (for example, `listen.client.ListenClient`) wraps operations derived from the
  API definitions. They consume typed request models and return typed responses or raise generated exceptions.
- **Models & Enums** – request/response payloads, error discriminators, streaming message bodies (from AsyncAPI).
- **Core Runtime** – Fern’s transport helpers (`HttpClient`, `AsyncHttpClient`, `WebSocket`, retry logic) and error
  primitives.

Generated files live under language-native namespaces (for example, `src/deepgram/core/` in Python) and should not be
modified manually.

## Hand-Written Layer

Hand-written code wraps the generated clients to provide:

- **Entry Points** – Idiomatic constructors (e.g., `DeepgramClient`, `AsyncDeepgramClient`) that accept additional
  options such as `access_token`, `telemetry_opt_out`, or custom headers.
- **Authentication Adapters** – Helpers that map Deepgram credential types (API key, short-lived auth token) to the
  generated client wrapper and header providers.
- **Telemetry Instrumentation** – Integration with the `extensions.telemetry` package that captures request metadata and
  emits batched events.
- **Transport Overrides** – Injection points for enterprise proxies, on-prem deployments, or testing harnesses by
  swapping Fern’s `HttpClient`/`WebSocket` implementations.
- **Quality-of-life Helpers** – Language-specific sugar (async context managers, streaming helpers, file abstractions)
  built strictly on top of generated service methods.

The Python SDK’s `deepgram/client.py` exemplifies this layer: it extends `BaseClient`, injects telemetry, overrides
headers when bearer tokens are provided, and offers session identifiers for cross-request correlation.

## Cross-Cutting Services

- **Telemetry** – `extensions.telemetry` provides batching, protobuf encoding, and handlers that send data to
  `https://telemetry.dx.deepgram.com/v1/telemetry`. Instrumented HTTP/WebSocket clients forward structured events.
- **Errors** – Generated exceptions inherit from a common `ApiError` that carries HTTP metadata. Hand-written layers can
  catch these errors or rewrap them in domain-specific failures.
- **Environment Selection** – Generated enums declare `PRODUCTION`, `STAGING`, and user-provided base URLs, ensuring all
  services resolve against the same host.

## Lifecycle

1. **Construction** – Language entrypoints gather configuration (credentials, telemetry preferences, overrides) and
   instantiate the generated base client.
2. **Call Execution** – Service client methods marshal requests into Fern transports, apply retries, and parse responses
   into typed models.
3. **Instrumentation** – Transport adapters emit telemetry events while preserving privacy by capturing aggregated
   metadata and masking sensitive payloads.
4. **Disposal** – Async clients close underlying HTTP clients or WebSocket connections; telemetry handlers flush pending
   batches.

This composition keeps generated code untouched while enabling Deepgram to iterate on telemetry or authentication
strategies with minimal friction.
