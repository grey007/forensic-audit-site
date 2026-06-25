# GitHub Copilot Repository Instructions

## Project

Project Name: **Forensic Audit Site**

This project is a production-quality web application built with:

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* Node.js
* GitHub
* Vercel

The application performs infrastructure investigations and presents findings using a forensic investigation workflow.

The project must remain modular, maintainable, and production-ready.

---

# Primary Goal

Build an enterprise-grade infrastructure investigation platform capable of analyzing domains and producing structured forensic reports.

The codebase should be designed for long-term growth rather than short-term implementation.

---

# Source of Truth

Always read these documents before implementing new features:

1. `docs/ARCHITECTURE.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/CODING_STANDARDS.md`
4. `docs/API_SPEC.md`
5. `docs/ROADMAP.md`

When conflicts exist:

Architecture > Product Spec > Ticket Instructions

---

# Development Workflow

Work only on one ticket at a time.

Before writing code:

1. Read the requested ticket.
2. Explain the implementation plan.
3. Identify affected files.
4. Wait for approval if requested.
5. Implement only the required changes.

Never implement multiple unrelated tickets together.

---

# Repository Structure

Respect the existing project structure.

app/

* App Router pages
* Route Handlers
* Layouts

components/

* Presentation-only UI components

hooks/

* Client-side business logic
* State machines
* Custom hooks

services/

* External services
* API clients
* Business operations

lib/

* Constants
* Configuration
* Shared utilities

types/

* Shared TypeScript types

docs/

* Project documentation

public/

* Static assets only

---

# Architectural Principles

Business logic must never live inside page components.

Components should be presentation-focused.

Hooks should own state.

Services should own infrastructure communication.

API Route Handlers should be thin wrappers around services.

Never duplicate business logic.

Prefer composition over inheritance.

Keep modules small and focused.

---

# Code Style

Always use:

* TypeScript
* Functional components
* React hooks
* Named exports unless Next.js requires defaults
* Strict typing
* Async/await
* Early returns

Avoid:

* any
* unnecessary type assertions
* deeply nested logic
* duplicated code
* large files

---

# Component Rules

Components should:

* receive data through props
* never fetch data directly
* never own business logic
* remain reusable
* remain testable

---

# Hooks

Hooks own:

* state
* timers
* workflow
* UI state machines
* orchestration

Hooks should not perform rendering.

---

# Services

Services handle:

* DNS
* WHOIS
* SSL
* MX
* SPF
* DKIM
* HTTP
* infrastructure analysis

Services should be independent from React.

---

# API Routes

Route Handlers should:

* validate requests
* call services
* return structured JSON
* avoid business logic

---

# State Management

Prefer local state.

Introduce global state only when necessary.

State machines are preferred for workflow management.

---

# Styling

Use Tailwind CSS.

Maintain the forensic aesthetic:

* dark
* minimal
* professional
* technical
* high contrast

Avoid bright colors unless indicating status.

---

# Performance

Prefer:

* Server Components where appropriate
* lazy loading
* memoization only when beneficial
* small bundles
* reusable components

Avoid premature optimization.

---

# Security

Validate all user input.

Never trust client data.

Sanitize external responses.

Do not expose secrets.

Use environment variables.

Avoid leaking stack traces.

---

# Error Handling

Errors should be:

* typed
* meaningful
* user-friendly
* logged appropriately

Never swallow exceptions silently.

---

# Accessibility

Maintain:

* semantic HTML
* keyboard navigation
* ARIA attributes where necessary
* accessible forms

---

# Dependencies

Do not introduce new packages unless clearly justified.

Prefer the existing stack.

---

# Testing Mindset

All code should be written so it can be tested.

Favor pure functions.

Keep side effects isolated.

---

# Git Workflow

Each ticket should produce:

* one logical commit
* descriptive commit message

Example:

feat: implement DNS investigation service

Do not combine unrelated work.

---

# Verification

Before considering a task complete, ensure the project passes:

npm run verify

The implementation should compile without TypeScript errors.

Linting should pass.

The production build should succeed.

---

# Ticket Response Format

For each implementation:

1. Summary
2. Files to modify
3. Implementation plan
4. Complete file contents (if requested)
5. Verification checklist

---

# Forbidden Actions

Do NOT:

* modify unrelated files
* rename files without reason
* change project architecture
* add unnecessary dependencies
* introduce breaking API changes
* remove existing functionality
* ignore TypeScript errors
* bypass linting
* leave TODO placeholders
* return incomplete implementations

---

# Preferred Approach

Always prefer:

small commits

small pull requests

modular architecture

clean abstractions

high readability

strict typing

long-term maintainability

production-ready implementations

---

# If Information Is Missing

Never invent project-specific behavior.

Ask for clarification when required.

Do not guess existing implementations.

---

# Goal

Every change should make the repository cleaner, more maintainable, and closer to a production-grade forensic investigation platform.
