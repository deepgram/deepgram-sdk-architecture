# Deepgram SDK Architecture

This repository captures the canonical architecture shared by every Deepgram SDK generated from the
[`deepgram-api-specs`](https://github.com/deepgram/deepgram-api-specs) definition using
[Fern](https://buildwithfern.com/). It documents the layered build pipeline, runtime primitives, and extension points
that keep language-specific SDKs – such as the
[`deepgram-python-sdk`](https://github.com/deepgram/deepgram-python-sdk) – consistent while letting each platform take
advantage of native capabilities.

## Contents

- [`docs/00-overview.md`](docs/00-overview.md) – goals, guiding principles, and package layout.
- [`docs/01-generation-pipeline.md`](docs/01-generation-pipeline.md) – how specs flow through Fern to produce SDKs.
- [`docs/02-runtime-architecture.md`](docs/02-runtime-architecture.md) – generated layers versus hand-written
  extensions.
- [`docs/03-authentication.md`](docs/03-authentication.md) – API key and bearer-token credential handling.
- [`docs/04-transport-abstraction.md`](docs/04-transport-abstraction.md) – HTTP/WebSocket pipelines and override hooks.
- [`docs/05-telemetry.md`](docs/05-telemetry.md) – phone-home telemetry capture, batching, and opt-out behavior.
- [`docs/06-module-map.md`](docs/06-module-map.md) – service-to-module mapping and domain responsibilities.
- [`docs/glossary.md`](docs/glossary.md) – shared terminology.

## Architecture Highlights

- **Spec-first generation** keeps SDKs synchronized with the public API and aligns release cadences.
- **Layered runtime** merges generated Fern clients with focused extension packages for authentication, telemetry, and
  transport customisation.
- **Flexible credentials** accept API keys, bearer tokens, or environment-derived secrets without boilerplate.
- **Pluggable transports** allow drop-in HTTP and WebSocket implementations for complex network environments.
- **Privacy-conscious telemetry** emits aggregated insights while supporting first-class opt-out controls.

## How to Use This Repository

1. Start with the [overview](docs/00-overview.md) to understand the package structure and cross-language goals.
2. Review the [generation pipeline](docs/01-generation-pipeline.md) when updating specs or Fern configuration.
3. Consult the runtime documents when adding features to individual SDKs or designing new extension layers.
4. Mirror the documented patterns when auditing language-specific implementations (for example, the Python SDK).

## Contributing

Improvements are welcome in the form of RFCs so we preserve a historical record of architectural decisions. Open a
[new RFC](https://github.com/deepgram/deepgram-sdk-architecture/issues/new?assignees=lukeocodes&labels=RFC%2C+draft&projects=&template=rfc.md&title=%5BDATE%5D%3A+%5BFEATURE+NAME%5D)
that links to relevant API spec or SDK changes.
