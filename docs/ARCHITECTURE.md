# ARCHITECTURE.md

# Infrastructure Forensics

Production Architecture Specification

Version: 1.0

Status: Living Architecture Document

---

# Purpose

This document defines the architectural standards for Infrastructure Forensics.

It is the authoritative reference for all implementation work. Every feature, component, service, and architectural decision must align with the principles documented here.

This document prioritizes long-term maintainability over short-term implementation speed.

---

# 1. Architectural Principles

Infrastructure Forensics is designed as a production-grade Software-as-a-Service platform capable of supporting individual users, enterprise customers, API consumers, and AI-assisted infrastructure analysis.

The architecture is guided by the following principles.

## Separation of Concerns

Every layer has a single responsibility.

Presentation, state management, business logic, transport, and infrastructure concerns remain isolated.

## Feature-Oriented Design

Features are organized around business capabilities rather than technical categories whenever practical.

Examples include:

* Investigation
* DNS
* WHOIS
* SSL
* Reports
* Authentication
* AI Analysis

Each feature should evolve independently.

## Composition Over Complexity

Small, composable components are preferred over large, multi-purpose implementations.

## Progressive Enhancement

The application must remain functional even when advanced capabilities are unavailable.

Examples include:

* Investigation without AI
* Report viewing without export
* Cached data when external providers are unavailable

## Server-First Rendering

Server Components are the default rendering model.

Client Components exist only where browser interactivity requires them.

## Incremental Evolution

Every implementation phase must leave the application in a deployable state.

No phase should require future rewrites.

---

# 2. Clean Architecture Rules

The application follows a layered architecture.

Presentation

↓

Hooks

↓

Services

↓

Route Handlers

↓

External Providers

Each layer communicates only with the layer immediately below it.

## Dependency Direction

Dependencies always point inward.

Presentation depends on hooks.

Hooks depend on services.

Services depend on route handlers.

Route handlers depend on infrastructure.

Infrastructure never depends on presentation.

## Forbidden Dependencies

Components must never call external APIs directly.

Pages must never contain business logic.

Hooks must never access external providers directly.

Services must never depend on UI.

Utilities must never depend on React.

Types must never depend on implementation.

---

# 3. Folder Structure

```
app/
  (marketing)/
  (dashboard)/
  api/
  investigation/

components/
  investigation/
  reports/
  dashboard/
  layout/
  navigation/
  shared/
  ui/

hooks/

services/
  investigation/
  dns/
  ssl/
  whois/
  reports/
  ai/

lib/

types/

utils/

public/

docs/
```

## Folder Responsibilities

### app

Routing and page composition.

### components

Reusable presentation.

Contains no business logic.

### hooks

Feature-specific UI orchestration.

Coordinates user interactions.

### services

Business operations.

Encapsulates all communication with application APIs.

### lib

Shared application infrastructure.

Configuration.

Constants.

Feature registries.

### utils

Pure utility functions.

No framework dependencies.

### types

Shared domain models.

### docs

Architecture and engineering documentation.

---

# 4. Dependency Graph

```
Pages

↓

Feature Components

↓

Reusable UI Components

↓

Hooks

↓

Services

↓

Route Handlers

↓

External Providers
```

The graph is intentionally one-directional.

Reverse dependencies are prohibited.

---

# 5. Component Responsibilities

## Pages

Compose features.

Never implement business logic.

Never manage asynchronous workflows.

## Feature Components

Represent complete user-facing features.

Coordinate smaller UI components.

Remain focused on presentation.

## Shared Components

Reusable building blocks.

Examples:

* Cards
* Tables
* Panels
* Empty states
* Loaders
* Status indicators

## UI Components

Design system primitives.

Examples:

* Button
* Input
* Badge
* Dialog
* Tabs
* Tooltip

These components must remain business-agnostic.

---

# 6. Hooks Layer

Hooks coordinate feature behavior.

Responsibilities include:

* Local UI state
* Form state
* Progress tracking
* Optimistic updates
* View state transitions
* Component orchestration

Hooks must not contain infrastructure logic.

Hooks should expose stable, minimal APIs.

Example responsibilities:

* Investigation lifecycle
* Report filtering
* Search
* Pagination
* Selection
* User preferences

---

# 7. Services Layer

Services encapsulate business operations.

Responsibilities include:

* Request construction
* Response normalization
* Retry strategies
* Error translation
* Data transformation
* Caching integration

Services provide a stable interface regardless of the underlying provider.

Replacing an external API should not require component changes.

---

# 8. Route Handlers

Route handlers provide the application's backend interface.

Responsibilities include:

* Authentication
* Authorization
* Validation
* Provider communication
* Response formatting
* Rate limiting
* Logging

They isolate external systems from the frontend.

Clients communicate only with application endpoints.

---

# 9. Data Flow

The canonical request flow is:

User Action

↓

Component

↓

Hook

↓

Service

↓

Route Handler

↓

External Provider

↓

Route Handler

↓

Service

↓

Hook

↓

Component

↓

Rendered UI

No layer may bypass this sequence.

---

# 10. State Management

## Local State

Managed within components.

Examples:

* Modal visibility
* Input values
* Expanded panels

## Feature State

Managed by custom hooks.

Examples:

* Investigation progress
* Report filters
* Selection state

## Server State

Retrieved through services.

Prefer server rendering where appropriate.

## Global State

Avoid until justified.

Introduce only for:

* Auth session
* Theme
* User preferences
* Workspace context

---

# 11. Error Handling Strategy

Errors are categorized into:

## Validation Errors

User-correctable.

Displayed inline.

## Network Errors

Transient failures.

Support retry.

## Provider Errors

External service unavailable.

Gracefully degraded.

## Application Errors

Unexpected failures.

Logged with sufficient diagnostic context.

Presented with generic messaging.

## Unknown Errors

Fail safely.

Never expose implementation details.

---

# 12. Performance Strategy

## Server Components by Default

Reduce client-side JavaScript.

Improve first render.

## Streaming

Use progressive rendering for long-running investigations.

## Suspense

Independent loading boundaries.

Prevent entire-page blocking.

## Lazy Loading

Large visualizations.

Historical reports.

Administrative interfaces.

AI features.

## Memoization

Apply only to measurable bottlenecks.

Avoid premature optimization.

## Asset Optimization

Optimize fonts, icons, and media.

Minimize bundle size.

---

# 13. Scalability Strategy

The platform is designed for gradual expansion.

Future capabilities include:

* Multi-user workspaces
* Enterprise organizations
* API access
* Background jobs
* AI pipelines
* Report persistence
* Billing
* Usage quotas
* Audit logging

Business capabilities remain isolated to minimize cross-feature impact.

---

# 14. Future Module Integration

Investigation modules are independent capabilities.

Examples:

* DNS
* WHOIS
* SSL
* HTTP Headers
* MX
* SPF
* DKIM
* DMARC
* ASN
* GeoIP
* CDN
* Hosting
* Fingerprinting
* Certificate Transparency
* Threat Intelligence
* Passive DNS
* Historical Analysis
* AI Summaries

Each module should expose a consistent contract:

* Input
* Execution
* Result
* Metadata
* Errors

Modules should be composable into a single investigation pipeline.

---

# 15. Coding Constraints

## File Responsibilities

One responsibility per file.

## Component Size

Target fewer than 150 lines.

Split when complexity grows.

## Business Logic

Forbidden inside pages.

Avoid inside UI components.

Prefer services and hooks.

## Type Safety

Strict typing throughout the application.

Avoid untyped values.

## Naming

Use descriptive names.

Avoid abbreviations.

Names should reflect business intent.

## Imports

Prefer feature-local imports.

Avoid circular dependencies.

## Comments

Explain architectural intent.

Do not narrate implementation.

---

# 16. Architecture Decision Summary

## ADR-001

Feature-based architecture.

Reason:

Supports long-term modularity.

## ADR-002

Server Components by default.

Reason:

Performance and reduced client complexity.

## ADR-003

Route handlers abstract external providers.

Reason:

Prevents provider lock-in.

Improves security.

## ADR-004

Business logic resides in services.

Reason:

Improves reuse and testability.

## ADR-005

Hooks orchestrate presentation behavior.

Reason:

Keeps components declarative.

## ADR-006

Design system built from reusable UI primitives.

Reason:

Visual consistency and maintainability.

## ADR-007

Incremental delivery.

Reason:

Every phase remains deployable.

## ADR-008

Independent investigation modules.

Reason:

Allows new forensic capabilities without modifying existing modules.

---

# Guiding Principle

Every architectural decision should optimize for maintainability, clarity, extensibility, and operational reliability rather than minimizing short-term implementation effort.

The architecture should allow Infrastructure Forensics to evolve from a single-domain investigation tool into a comprehensive enterprise digital forensics platform without requiring fundamental structural changes.
