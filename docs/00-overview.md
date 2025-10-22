# Overview

Deepgram SDKs share a common blueprint that combines generated Fern clients with a thin layer of language-specific
customisations. This document outlines the high-level goals and layout that every SDK implementation follows.

## Goals

- **Consistency** – Each SDK exposes the same surface area and defaults because the entrypoint, resources, and errors
  are generated from the single source of truth: [`deepgram-api-specs`](https://github.com/deepgram/deepgram-api-specs).
- **Extensibility** – Language-specific packages can add ergonomic helpers or integrate with native ecosystems without
  modifying generated code.
- **Reliability** – Cross-cutting features (authentication, telemetry, transport overrides) are provided centrally to
  minimise divergence between SDKs.
- **Observability** – Opt-out telemetry gives Deepgram insight into which features are used and when problems occur
  while respecting developer privacy.

## Layered Runtime

```
┌─────────────────────────────────────────────────────────────────────┐
│ Language Package (e.g., `deepgram-python-sdk`)                      │
│  ├─ Hand-written entrypoints (`DeepgramClient`, helpers, adapters)  │
│  └─ Extensions (auth, telemetry, transport shims, type aliases)     │
├─────────────────────────────────────────────────────────────────────┤
│ Generated Fern SDK (shared across languages)                        │
│  ├─ Base clients & service groups (listen, speak, manage, …)        │
│  ├─ Request/response models, retries, error handling                │
│  └─ HTTP/WebSocket primitives built on Fern runtime                 │
├─────────────────────────────────────────────────────────────────────┤
│ API Definition (`deepgram-api-specs` – OpenAPI + AsyncAPI)          │
└─────────────────────────────────────────────────────────────────────┘
```

Fern orchestrates the pipeline from the API definition to language-specific packages, guaranteeing that behaviour and
types align across ecosystems.

## Repository Layout

- [`01-generation-pipeline`](01-generation-pipeline.md) documents how specs and Fern configuration produce SDKs.
- [`02-runtime-architecture`](02-runtime-architecture.md) details the runtime layering and core packages.
- [`03-authentication`](03-authentication.md), [`04-transport-abstraction`](04-transport-abstraction.md), and
  [`05-telemetry`](05-telemetry.md) capture cross-cutting features.
- [`06-module-map`](06-module-map.md) maps API resources to SDK modules.

## Primary Personas

- **SDK maintainers** learn how to extend or patch language-specific behaviour without breaking generated code.
- **Infrastructure and platform teams** understand how telemetry and transport hooks plug into Deepgram systems.
- **Contributors** use the shared terminology and high-level flows as baselines for RFCs and feature proposals.
