# Authentication

Deepgram SDKs support two credential types everywhere: long-lived API keys and short-lived bearer tokens (auth tokens).
Both are handled by the hand-written entrypoints so generated code keeps a single authentication surface.

## Credential Sources

| Type              | Description                                                                 | Header Produced           | Typical Lifetime |
|-------------------|-----------------------------------------------------------------------------|---------------------------|------------------|
| API Key           | Static key provisioned in the Deepgram console.                             | `Authorization: Token …`  | Long (months)    |
| Auth Token        | Short-lived JWT issued by the Auth API for delegated access.                | `Authorization: bearer …` | Minutes / hours  |
| Environment Key   | `DEEPGRAM_API_KEY` environment variable read automatically by Fern clients. | `Authorization: Token …`  | Long (matches key) |

## Runtime Behaviour

1. **Constructor Guards**  
   - Generated `BaseClient` raises if no `api_key` is present after environment fallback.
   - Hand-written entrypoints accept either `api_key` or `access_token`. When `access_token` is provided the code
     overrides Fern’s header provider to emit a bearer token.

2. **Header Override**  
   - `_apply_bearer_authorization_override` mutates the Fern client wrapper so both HTTP and WebSocket transports emit
     `Authorization: bearer <token>` while preserving all other headers (`X-Fern-SDK-Version`, telemetry session ID).

3. **Session Identification**  
   - Entry points generate a UUID session ID and inject `x-deepgram-session-id` into every request. This ID ties
     telemetry, logs, and support requests together regardless of credential type.

4. **On-Prem / Custom Domains**  
   - Consumers may override the base URL or environment enumeration to target self-hosted deployments. Credential logic
     remains identical; only the host changes.

## Usage Patterns

### API Key (default)

```python
from deepgram import DeepgramClient

client = DeepgramClient(api_key="dg_key_...")
client.listen.prerecorded.v("...")  # Generated method signature
```

### Auth Token

```python
from deepgram import DeepgramClient

client = DeepgramClient(access_token="dg_token_...")
```

Because the bearer override happens centrally, downstream service clients require no awareness of credential types.

## Best Practices

- **Use auth tokens** for untrusted environments (front-end clients, ephemeral compute). Rotate them via the Auth API
  documented in `deepgram-api-specs`.
- **Store API keys** in environment variables for server workloads. Avoid hardcoding secrets in code or config files.
- **Combine with custom headers** (`headers={"X-Application": "… "}`) to add tenant metadata; the override retains any
  custom headers passed by the user.

Authentication logic MUST remain in the entrypoint layer so regenerated code stays pure and repeatable.
