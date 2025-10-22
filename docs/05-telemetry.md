# Telemetry

Deepgram SDKs collect lightweight telemetry to improve product reliability and developer experience. The signal is
designed to be privacy-conscious, opt-out friendly, and transport-agnostic.

## Objectives

- Measure feature adoption (which endpoints are called, success/error rates).
- Detect systemic issues (latency spikes, transport failures) across languages.
- Correlate support tickets by `x-deepgram-session-id` without inspecting customer payloads.

## Components

| Component                               | Responsibility                                                                       |
|-----------------------------------------|---------------------------------------------------------------------------------------|
| `extensions.telemetry.handler`          | Abstract base handler API used by instrumented transports.                           |
| `extensions.telemetry.batching_handler` | Default implementation that buffers events and sends them to the telemetry endpoint. |
| `extensions.core.telemetry_events`      | Converts HTTP/WebSocket lifecycle events into telemetry payloads.                    |
| `extensions.core.instrumented_http`     | Wraps the Fern HTTP client to emit telemetry callbacks around each request.          |
| `extensions.core.instrumented_socket`   | Hooks into WebSocket connections for live streaming observability.                   |
| `extensions.telemetry.proto_encoder`    | Serialises batched events using protobuf for efficient network transfer.             |

## Event Lifecycle

1. **Session Creation** – Entry points generate a UUID session ID and add it to every request header. This value anchors
   all telemetry events for a client instance.
2. **Instrumentation Setup** – When the client is constructed (and `telemetry_opt_out` is `False`), an instrumented HTTP
   client and WebSocket hooks are installed with a telemetry handler.
3. **Event Capture** – Each HTTP/WebSocket request emits `on_http_request`, `on_http_response`, or `on_http_error`
   callbacks. Payloads are summarised (method, URL, status code, duration, coarse payload metadata) without persisting
   raw audio or PII.
4. **Batch Encoding** – Events are buffered in-memory and optionally encoded via protobuf before submission.
5. **Delivery** – Batches are POSTed to `https://telemetry.dx.deepgram.com/v1/telemetry` by default. Enterprises may
   supply a custom handler that forwards events to internal observability stacks.

If any step fails, the SDK disables telemetry for that client instance and continues serving API requests normally.

## Opt-Out Controls

- Constructor parameter `telemetry_opt_out=True` disables telemetry entirely.
- Environment variables or policy configuration can short-circuit handler creation prior to instrumentation.
- Consumers may provide their own `TelemetryHandler` to direct events to private infrastructure while maintaining
  protocol compatibility.

## Custom Handlers

Implement a subclass of `TelemetryHandler` (or adapt the interface in other languages) to receive events:

```python
from deepgram.extensions.telemetry.handler import TelemetryHandler

class NoOpHandler(TelemetryHandler):
    def handle(self, event) -> None:
        pass

client = DeepgramClient(api_key="dg_key_...", telemetry_handler=NoOpHandler())
```

Custom handlers can redact, enrich, or redirect telemetry data before it leaves the application boundary.

## Data Stewardship

- **No payloads** – Audio, transcripts, and other sensitive content are never logged or transmitted.
- **Minimal metadata** – Only path templates, status codes, durations, and coarse error messages are reported.
- **Documentation** – Telemetry behaviour is documented publicly so developers understand what is collected and why.
