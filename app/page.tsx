"use client";

import { DomainForm } from "@/components/investigation/DomainForm";
import { Hero } from "@/components/investigation/Hero";
import { InvestigationNotes } from "@/components/investigation/InvestigationNotes";
import { TerminalScanner } from "@/components/investigation/TerminalScanner";
import { useInvestigation } from "@/hooks/investigation";

export default function HomePage() {
  const { state, actions } = useInvestigation();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <Hero />

        {state.viewState === "idle" && (
          <DomainForm
            domain={state.domain}
            disabled={state.isScanning}
            onDomainChange={actions.setDomain}
            onSubmit={actions.startInvestigation}
          />
        )}

        {state.viewState === "scanning" && (
          <TerminalScanner
            target={state.domain}
            currentCheckpoint={state.currentCheckpoint}
          />
        )}

        {state.viewState === "notesRendered" && (
          <InvestigationNotes target={state.domain} />
        )}
      </div>
    </main>
  );
}