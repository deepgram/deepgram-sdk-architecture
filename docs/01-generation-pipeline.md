# Generation Pipeline

Deepgram SDKs are generated from the same API definition using [Fern](https://buildwithfern.com/). This pipeline keeps
language packages in sync with the platform and enforces consistent defaults.

## Source of Truth

- **Composite specs** are maintained in the private `deepgram/internal-api-specs` repository. Multiple definition
  fragments (service domains, shared schemas) are merged there into a release-ready bundle.
- **Public distribution** occurs when the internal bundle is hoisted into a `dist/` artifact and published to
  [`deepgram-api-specs`](https://github.com/deepgram/deepgram-api-specs). SDK teams consume the published bundle so the
  public repo remains the canonical reference for versioned releases.
- **Fern configuration** (targets, generators, naming rules, error mappings) resides alongside each SDK implementation.
  The Python SDK uses `fern/config.yml` as a reference for other languages.

Specs define domains (`listen`, `speak`, `manage`, `read`, `agent`, `auth`, `self_hosted`) which Fern converts into
typed clients, request/response models, errors, and streaming schemas.

## End-to-End Flow

1. **Update Specs**  
   - Modify composite fragments in `deepgram/internal-api-specs`, then regenerate the bundled `dist/` artifact.  
   - Promote the bundle to `deepgram-api-specs` and run linting/contract tests before publishing changes.
2. **Sync Specification Version**  
   - Bump the Fern generator dependency in language repositories if the schema release changed.  
   - Ensure SDK feature flags or beta endpoints are toggled through config (not by editing generated files).
3. **Generate Code**  
   - Run `fern generate --group <language>` to emit the base client package into `src/deepgram/` (or the language
     equivalent).  
   - Generated artifacts include: base/async base clients, service groups, request/response models, shared enums,
     error types, and default HTTP/WebSocket clients.
4. **Apply Post-Processing Hooks**  
   - Automated scripts add Deepgram headers (for example, `X-Fern-SDK-Version`) and adjust packaging metadata.  
   - Linters/formatters run to align with language conventions.
5. **Integrate Hand-Written Extensions**  
   - Language maintainers implement entrypoints like `DeepgramClient` that extend the generated base classes.  
   - Telemetry, authentication adapters, and custom transports wrap generated primitives without modifying them.
6. **Publish Artifacts**  
   - Package the SDK using the language’s toolchain (PyPI, npm, NuGet, etc.).  
   - Tag the release with the API spec commit for traceability.

## Generation Configuration

Key Fern configuration concepts:

- **Groups** – logical collections of endpoints that become language modules. The mapping is codified in
  [`06-module-map.md`](06-module-map.md). Each group can be toggled per language.
- **Headers** – default headers (SDK name/version, session identifiers) are injected via Fern config hooks so every
  request carries consistent metadata.
- **Error Types** – specification error unions map to strongly typed exceptions; Fern handles inheritance while
  hand-written code applies language ergonomics.
- **Environment Targets** – enumerations (production, staging, custom base URL) are generated to keep endpoints aligned.

## Quality Gates

- **Contract tests** validate that generated clients match the spec (shape and response parsing).  
- **Golden tests** ensure regenerated code only changes when specs do.  
- **Smoke tests** run against live endpoints for core operations (transcribe, live streaming, speak).

When a new feature lands in the specs, SDK maintainers regenerate code, extend the appropriate high-level helpers, and
update documentation to reflect behaviour changes.
