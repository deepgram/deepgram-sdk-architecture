# Transport Abstraction

Fern generates HTTP and WebSocket clients that rely on language-standard networking libraries (for example, `httpx` in
Python). Deepgram extends these transports so enterprise deployments can route traffic through custom stacks without
forking the SDK.

## Generated Primitives

- **`core.http_client.HttpClient` / `AsyncHttpClient`** – thin wrappers over the underlying HTTP library. They apply
  default headers, timeouts, and retry policies configured in Fern.
- **`core.web_socket` utilities** – manage WebSocket lifecycle for streaming features such as Live Transcription.
- **Request Options** – standard metadata (timeout override, retries, idempotency keys) applied per request.

## Extension Points

1. **Constructor Injection**
   - All entrypoints accept a fully configured HTTP client (`httpx.Client`, `httpx.AsyncClient`, or the language
     equivalent).  
   - Passing a custom client allows callers to set corporate proxies, TLS certificates, keep-alive pools, or request
     tracing.

2. **Instrumented Clients**
   - `extensions.core.instrumented_http` and `instrumented_socket` wrap generated transports, forwarding events to the
     telemetry layer.  
   - Instrumentation preserves the delegate interface, so service clients remain unaware of the instrumentation.

3. **Self-Hosted Deployments**
   - Consumers combine environment overrides with custom transports to point at on-prem Deepgram instances.  
   - The `self_hosted` module (generated) exposes helper endpoints tailored for appliance-style setups.

4. **Request Hooks**
   - Fern’s `RequestOptions` allow per-call overrides (headers, query parameters). Hand-written helpers expose these
     options when advanced control is required.

## Example: Custom HTTP Client (Python)

```python
import httpx
from deepgram import DeepgramClient

httpx_client = httpx.Client(
    base_url="https://api.deepgram.com",
    proxies="http://corp-proxy.internal:8080",
    verify="/etc/ssl/certs/corp.pem",
    timeout=30.0,
)

client = DeepgramClient(api_key="dg_key_...", httpx_client=httpx_client)
```

The SDK reuses the supplied `httpx.Client`, layering authorization headers, telemetry session IDs, and retries on top of
the delegate.

## WebSocket Flexibility

- WebSocket instrumentation uses monkey-patching (`apply_websocket_instrumentation`) to intercept connections at the
  Fern runtime boundary.  
- For environments that require alternative WebSocket stacks (for example, restricted IoT devices), provide a custom
  implementation that satisfies the generated interface and register it at bootstrap.

## Design Principles

- **No shared singletons** – Every client instance owns its transports to avoid cross-tenant leakage.
- **Graceful degradation** – If instrumentation fails, the SDK falls back to raw transports rather than failing calls.
- **Minimal surface** – Transport overrides happen through constructor injection and a small set of helper APIs, so the
  majority of consumers rely on safe defaults.
