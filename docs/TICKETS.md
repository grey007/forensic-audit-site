# Forensic Audit Site Development Tickets

This document is the permanent implementation log and development backlog.

It is the primary source of truth for project progress.

If all other planning documents are unavailable, development should be able to continue using only this file and `CURRENT_STATE.md`.

---

# Development Rules

Each ticket must:

* solve one problem
* be independently testable
* compile successfully
* pass `npm run verify`
* produce one logical commit

Never combine unrelated tickets.

---

# Ticket Status Legend

⬜ Not Started

🟨 In Progress

🟩 Complete

🟥 Blocked

---

# Phase 1 — Project Foundation

## Ticket 001

Status

🟩 Complete

Title

Repository Architecture

Goal

Create the production folder structure and documentation.

Deliverables

* docs
* hooks
* services
* types
* constants
* project organization

---

## Ticket 002

Status

🟩 Complete

Title

Investigation Domain Model

Goal

Create shared investigation types.

Deliverables

* InvestigationState
* ViewState
* Hook contract
* Constants

Dependencies

Ticket 001

---

## Ticket 003

Status

🟩 Complete

Title

Investigation Hook

Goal

Create the frontend state machine.

Workflow

idle

↓

scanning

↓

notesRendered

Deliverables

* useInvestigation
* timers
* cleanup
* checkpoint rotation

---

## Ticket 004

Status

🟩 Complete

Title

Hero Component

Deliverables

Landing page header.

---

## Ticket 005

Status

🟩 Complete

Title

Domain Form

Deliverables

Controlled input.

Validation.

Submission.

---

## Ticket 006

Status

🟩 Complete

Title

Terminal Scanner

Deliverables

Animated terminal interface.

Checkpoint rendering.

---

## Ticket 007

Status

🟩 Complete

Title

Investigation Notes

Deliverables

Notebook UI.

Preliminary observations.

---

## Ticket 008

Status

🟩 Complete

Title

Compose Landing Page

Deliverables

Wire Hero, DomainForm, TerminalScanner, InvestigationNotes together in `app/page.tsx`.

---

# Phase 2 — Infrastructure Analysis

## Ticket 009

Status

🟩 Complete

DNS API Foundation

Deliverables

* DNS types
* DNS service
* API route

---

## Ticket 010

Status

🟩 Complete

DNS Integration

Goal

Replace simulated investigation with live DNS lookup.

Deliverables

* Update useInvestigation
* Connect frontend to API
* Handle loading
* Handle errors
* Render real DNS data

---

## Ticket 011

Status

⬜ Not Started

WHOIS Analyzer

Deliverables

Registrar

Creation Date

Expiration

Nameservers

---

## Ticket 012

Status

⬜ Not Started

SSL Analyzer

Deliverables

Certificate

Issuer

Validity

Cipher

---

## Ticket 013

Status

⬜ Not Started

Email Security

Deliverables

MX

SPF

DKIM

DMARC

---

## Ticket 014

Status

⬜ Not Started

HTTP Headers

Deliverables

Security headers

Redirect chain

Server

HSTS

CSP

---

## Ticket 015

Status

⬜ Not Started

Hosting Intelligence

Deliverables

ASN

Hosting provider

IP

Geo

CDN

---

## Ticket 016

Status

⬜ Not Started

Reverse DNS

---

## Ticket 017

Status

⬜ Not Started

Infrastructure Timeline

---

## Ticket 018

Status

⬜ Not Started

Risk Scoring Engine

---

## Ticket 019

Status

⬜ Not Started

Evidence Collection Engine

---

## Ticket 020

Status

⬜ Not Started

Case File Builder

---

# Phase 3 — Reporting

## Ticket 021

PDF Export

## Ticket 022

Markdown Export

## Ticket 023

JSON Export

## Ticket 024

Print View

---

# Phase 4 — Persistence

## Ticket 025

Database Schema

## Ticket 026

Save Investigations

## Ticket 027

Dashboard

## Ticket 028

Search

## Ticket 029

Tags

---

# Phase 5 — Authentication

## Ticket 030

User Accounts

## Ticket 031

Sessions

## Ticket 032

Role Management

---

# Phase 6 — Intelligence

## Ticket 033

AI Investigation Summary

## Ticket 034

Infrastructure Graph

## Ticket 035

Timeline Visualization

## Ticket 036

Attack Surface Mapping

---

# Ticket Completion Checklist

Before marking any ticket complete:

* Feature works
* TypeScript passes
* ESLint passes
* Build succeeds
* Documentation updated
* CURRENT_STATE.md updated
* Commit created
* Pushed to GitHub

---

# AI Development Rules

Any AI assistant working on this project should:

1. Read `CURRENT_STATE.md`.
2. Read this file.
3. Identify the first incomplete ticket.
4. Implement only that ticket.
5. Verify with `npm run verify`.
6. Update both documents.
7. Stop and wait for the next ticket.

Never skip tickets unless explicitly instructed.

Never modify completed tickets without documenting why.

Treat this document as the authoritative project history and implementation roadmap.
