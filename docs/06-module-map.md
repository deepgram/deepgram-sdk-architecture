# Module Map

Fern groups API endpoints into service modules. Maintaining the same group structure across languages ensures feature
parity and predictable discoverability.

## Service Groups

| Module        | Source Spec Section                                   | Responsibilities                                                                                                    | Notes                                                                 |
|---------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `listen`      | `openapi.yml#/paths/.../listen`                        | Prerecorded and live transcription, webhook-based async jobs, configuration presets, stream lifecycle management.   | Includes WebSocket streaming (AsyncAPI) and REST polling APIs.        |
| `speak`       | `openapi.yml#/paths/.../speak`                         | Text-to-speech synthesis operations, voice controls, media format selection.                                        | Supports long-running job polling and webhook notifications.         |
| `read`        | `openapi.yml#/paths/.../read`                          | Text understanding, summarisation, and post-processing endpoints.                                                   | Emerging feature set – may be guarded by beta flags.                 |
| `manage`      | `openapi.yml#/paths/.../manage`                        | Project, member, and key management APIs.                                                                           | Typically requires project-level API keys with elevated privileges.   |
| `auth`        | `openapi.yml#/paths/.../auth`                          | Short-lived token issuance, scoping, and revocation endpoints.                                                       | Drives bearer-token support documented in [`03-authentication.md`].   |
| `agent`       | `openapi.yml#/paths/.../agent`                         | Agent-specific configuration: knowledge stores, workflows, session orchestration.                                   | Encapsulates higher-level AI orchestration APIs.                     |
| `self_hosted` | `openapi.yml#/paths/.../self-hosted` & deployment docs | Tools for on-prem deployments: license validation, health checks, model package management.                         | Often combined with transport overrides for isolated networks.       |

## Shared Utilities

- **`core`** – Transport clients, request options, retry/backoff logic, environment enumerations, API error types.
- **`environment`** – Enumerated hosts (`PRODUCTION`, `STAGING`, `CUSTOM`). Mirrors both cloud and private deployments.
- **`types`** – Named schemas shared across services (for example, `TranscriptionConfig`, `UsageSummary`).
- **`errors`** – Generated exception hierarchy with discriminators aligning to API error responses.

## Extending the Map

When the API introduces a new domain:

1. Add the endpoints and schemas to `deepgram-api-specs`.
2. Update Fern configuration to include the new group and assign module names.
3. Regenerate SDKs and implement any required entrypoint helpers or telemetry enrichment.
4. Document the changes here so all language maintainers understand placement and responsibilities.

Keeping this map updated prevents drift across SDKs and establishes a predictable namespace for users exploring new
features.
