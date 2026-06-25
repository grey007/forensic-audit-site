# Infrastructure Forensics — Implementation Context

**Version:** 1.0

**Status:** Living Engineering Handbook

---

# 1. Project Overview

## Purpose

Infrastructure Forensics is a production-grade SaaS application for investigating the technical infrastructure of internet domains. It presents infrastructure analysis as a digital forensic investigation rather than a traditional network or SEO tool.

## Investigation Workflow

The application guides users through a structured investigation lifecycle:

```text
Landing Page
        ↓
Enter Domain
        ↓
Infrastructure Investigation
        ↓
Evidence Collection
        ↓
Preliminary Investigation Notes
        ↓
Complete Case File
        ↓
Export & Reporting
```

The experience should resemble an analyst building a forensic case from technical evidence.

## Current Development Stage

The project has completed the initial frontend architecture and has begun integrating backend investigation capabilities.

Current implementation includes:

* Investigation state machine
* Presentation components
* DNS API client
* DNS service
* DNS Route Handler
* Shared domain models

Future investigation modules will extend this foundation.

## Long-Term Vision

Infrastructure Forensics is designed to evolve into an enterprise SaaS platform supporting:

* Persistent investigations
* Historical reports
* Authentication
* Organizations and workspaces
* AI-generated analysis
* Background processing
* Threat intelligence
* Billing
* API access

---

# 2. Technology Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4
* App Router

## Development

* ESLint
* npm
* GitHub

## Deployment

* Vercel

---

# 3. Repository Structure

## `app/`

Application routes, layouts, pages, and Route Handlers.

## `components/`

Reusable presentation components.

No business logic.

## `hooks/`

Client-side state orchestration.

Coordinates feature workflows and UI state.

## `services/`

Business logic and external integrations.

Contains API clients and investigation services.

## `types/`

Shared domain and API models.

Framework independent.

## `lib/`

Constants, configuration, and shared infrastructure utilities.

## `utils/`

Pure helper functions with no framework dependencies.

## `docs/`

Architecture, product specifications, coding standards, API specifications, and engineering documentation.

---

# 4. Architecture Principles

Application dependencies always flow in one direction.

```text
UI
        ↓
Hooks
        ↓
API Client
        ↓
Route Handler
        ↓
Service Layer
        ↓
External Providers
```

Rules:

* Dependencies only flow downward.
* No reverse dependencies.
* Business logic never belongs inside presentation components.
* Services must never depend on UI.
* Hooks coordinate workflows but do not contain infrastructure-specific business logic.

---

# 5. Feature Module Philosophy

Every feature should remain cohesive.

## Presentation Components

* Render UI
* Receive props
* Own no business logic

## Hooks

* Manage client state
* Coordinate workflows
* Call API clients

## API Clients

* Communicate with application endpoints
* Normalize responses

## Services

* Own business logic
* Integrate with external providers

## Route Handlers

* Validate requests
* Delegate to services
* Return structured JSON responses

---

# 6. Coding Standards

All code must follow these standards:

* Strict TypeScript
* No `any`
* Small focused functions
* Descriptive names
* Barrel exports where appropriate
* JSDoc for exported APIs
* Accessibility first
* Readability over cleverness
* Composition over inheritance
* One responsibility per file

---

# 7. Component Rules

Components must:

* Receive data through props
* Remain reusable
* Be presentation-only
* Use semantic HTML
* Follow accessibility best practices

Components must not:

* Call `fetch()`
* Import services
* Import Route Handlers
* Contain business logic
* Manage application workflows

---

# 8. Hook Rules

Hooks may:

* Manage feature state
* Coordinate state transitions
* Call API clients
* Handle asynchronous workflows

Hooks must not:

* Parse DNS responses
* Call external providers directly
* Render UI
* Duplicate service logic

Hooks are the single source of client-side feature state.

---

# 9. Service Rules

Services contain business logic only.

Services must:

* Be framework independent where practical
* Integrate with external providers
* Normalize provider responses
* Throw meaningful errors

Services must not:

* Import React
* Import UI components
* Depend on browser storage
* Render UI

---

# 10. API Route Rules

Route Handlers should only:

* Validate input
* Call services
* Return JSON responses
* Translate service errors into HTTP responses

Route Handlers must not:

* Parse provider responses
* Duplicate business logic
* Implement investigation workflows

Keep Route Handlers thin.

---

# 11. Styling Rules

The application follows a forensic workstation aesthetic.

Guidelines:

* Dark theme
* Tailwind CSS only
* No inline styles
* No gradients
* No glassmorphism
* No neon effects
* Thin zinc borders
* Comfortable spacing
* Monospace only where appropriate
* High contrast
* Professional appearance

Animations should communicate application state, never decorate it.

---

# 12. Ticket Workflow

Each ticket should:

1. Implement one responsibility.
2. Remain small in scope.
3. Preserve existing architecture.
4. Pass verification.
5. Be committed independently.
6. Be pushed after review.

Avoid combining unrelated work into a single ticket.

---

# 13. Verification Workflow

Before every commit, run:

```bash
npm run verify
```

The verification process should include:

* ESLint
* TypeScript type checking
* Production build

No ticket should be committed while verification fails.

---

# 14. Git Workflow

Each ticket should follow:

```bash
git add .

git commit -m "Ticket #XXX: <summary>"

git push
```

One commit per ticket.

Keep commit messages concise and descriptive.

---

# 15. Existing File Rule

When modifying an existing file:

* Use the current file as the starting point.
* Preserve unrelated functionality.
* Avoid regenerating the file from memory.
* Return the complete updated file.

Never overwrite existing work blindly.

---

# 16. New File Rule

When creating a new file:

* Return the complete file.
* Follow the existing folder structure.
* Use the project's established conventions.
* Include concise documentation for exported APIs where appropriate.

---

# 17. Documentation Rule

Documentation is part of the architecture.

Whenever architectural decisions change:

* Update the relevant documentation.
* Keep implementation and documentation synchronized.
* Treat documentation as a maintained artifact.

---

# 18. Ticket Numbering

Development is organized into sequential tickets.

Example:

* Ticket #001
* Ticket #002
* Ticket #003

Continue numbering without gaps.

Each ticket should represent one logical unit of work.

---

# 19. Self Review Checklist

Before completing any implementation, verify:

* ✓ TypeScript passes
* ✓ ESLint passes
* ✓ Accessibility reviewed
* ✓ Architecture respected
* ✓ Separation of concerns maintained
* ✓ No duplicated business logic
* ✓ No unnecessary dependencies
* ✓ Production readiness

Address all issues before considering the work complete.

---

# 20. Definition of Done

A ticket is considered complete only when:

* Implementation is finished.
* `npm run verify` passes successfully.
* Changes have been committed.
* Changes have been pushed to the remote repository.
* Deployment is completed through Vercel (when applicable).

Meeting these criteria ensures every ticket leaves the repository in a stable, production-ready, deployable state.
