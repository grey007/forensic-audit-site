# Current Project State

Last Updated: *(Update this after every merged ticket)*

---

# Project Overview

Project Name: **Forensic Audit Site**

Purpose:

A production-grade forensic infrastructure investigation platform that analyzes internet-facing assets (domains, DNS, email security, TLS, hosting, HTTP headers, reputation, etc.) and presents findings as structured investigator case files.

Current Stack:

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* ESLint
* Vercel
* GitHub

---

# Repository Status

Status:

🟢 Active Development

Branch:

main

Deployment:

Production via Vercel

Verification Command:

```bash
npm run verify
```

All code merged into `main` must pass:

* ESLint
* TypeScript
* Next.js Production Build

---

# Current Architecture

Presentation Layer

* Hero
* DomainForm
* TerminalScanner
* InvestigationNotes

Business Layer

* useInvestigation hook

Services

* DNS lookup service
* API client layer

API

* App Router Route Handlers

Documentation

Located under `/docs`.

---

# Implemented Features

## Foundation

Completed

* Project architecture
* Documentation
* Repository organization
* Verification workflow
* GitHub integration

---

## UI

Completed

* Hero
* Domain input
* Investigation notebook
* Terminal scanner
* Dark forensic theme

---

## Investigation Workflow

Completed

State machine

idle

↓

scanning

↓

notesRendered

---

## Infrastructure

Completed

* DNS service abstraction
* API route foundation
* Shared types
* Constants

---

# Not Yet Implemented

High Priority

* Live DNS investigation
* WHOIS
* SSL
* MX
* SPF
* DKIM
* DMARC
* HTTP headers
* ASN lookup
* Reverse DNS

Medium Priority

* PDF reports
* Saved investigations
* Authentication
* Dashboard
* Investigation history

Future

* AI summarization
* Timeline reconstruction
* Attack surface visualization
* Infrastructure graph
* Risk scoring
* Investigation export

---

# Folder Ownership

app/

Routing only

components/

Presentation

hooks/

Workflow

services/

Infrastructure

lib/

Constants

types/

Shared contracts

docs/

Architecture

---

# Coding Standards

Business logic never belongs inside components.

Components remain presentation-only.

Hooks own workflow.

Services own infrastructure communication.

API routes remain thin.

---

# Current Risks

* No persistence
* No authentication
* Limited analyzers
* Simulated workflow still present in some areas

---

# Next Recommended Ticket

Continue with the first unfinished ticket listed in `TICKETS.md`.

---

# Maintenance

After every completed ticket update:

* Implemented Features
* Not Yet Implemented
* Current Risks
* Next Recommended Ticket

This file is intended to allow a new developer or AI assistant to understand the current project within minutes.
