import { OpenCaseButton } from "./OpenCaseButton";

interface InvestigationNotesProps {
  domain: string;
}

const OBSERVATIONS = [
  {
    title: "Observation 1",
    content: [
      "DNS resolution completed successfully.",
      "Infrastructure is publicly reachable without abnormal lookup latency.",
    ],
  },
  {
    title: "Observation 2",
    content: [
      "MX records appear to reference a managed email provider.",
      "Email trust infrastructure appears stable.",
      "SPF/DKIM alignment requires deeper verification.",
    ],
  },
  {
    title: "Observation 3",
    content: [
      "Name server delegation appears internally consistent.",
      "No immediate evidence of fragmented authority.",
    ],
  },
  {
    title: "Observation 4",
    content: [
      "Initial infrastructure fingerprint suggests a modern hosting environment.",
      "Additional artifact correlation is required before attribution.",
    ],
  },
];

export function InvestigationNotes({
  domain,
}: InvestigationNotesProps) {
  return (
    <section
      aria-labelledby="investigation-notes-heading"
      className="mx-auto w-full max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 font-mono text-zinc-300"
    >
      <header className="mb-8 border-b border-zinc-800 pb-4">
        <h2
          id="investigation-notes-heading"
          className="text-xl font-semibold text-zinc-100"
        >
          Preliminary Investigation Notes
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Target:{" "}
          <span className="break-all text-zinc-300">{domain}</span>
        </p>
      </header>

      <div className="space-y-8">
        {OBSERVATIONS.map((observation) => (
          <section key={observation.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {observation.title}
            </h3>

            <div className="space-y-2 text-sm leading-7">
              {observation.content.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="border-t border-zinc-800 pt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Investigator Note
          </h3>

          <div className="space-y-2 text-sm leading-7">
            <p>
              Preliminary evidence is sufficient to open a complete
              infrastructure case file.
            </p>

            <p>
              Current observations should not be treated as final
              conclusions.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 border-t border-zinc-800 pt-6">
        <OpenCaseButton />
      </div>
    </section>
  );
}