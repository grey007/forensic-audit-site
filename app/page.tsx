"use client";

import { DomainForm } from "@/components/investigation/DomainForm";
import { Hero } from "@/components/investigation/Hero";
import { useInvestigation } from "@/hooks/investigation";

export default function HomePage() {
  const { state, actions } = useInvestigation();

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <Hero />

        <DomainForm
          domain={state.domain}
          disabled={state.isScanning}
          onDomainChange={actions.setDomain}
          onSubmit={actions.startInvestigation}
        />
      </div>
    </main>
  );
}