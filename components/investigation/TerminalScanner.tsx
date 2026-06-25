interface TerminalScannerProps {
  domain: string;
  currentCheckpoint: string;
}

const TERMINAL_LOG = [
  "[ OK ] Resolver initialized",
  "[ OK ] Passive evidence collection running",
  "[ .. ] Building infrastructure timeline",
  "[ .. ] Correlating technical artifacts",
  "[ .. ] Preparing investigator notebook",
];

export function TerminalScanner({
  domain,
  currentCheckpoint,
}: TerminalScannerProps) {
  return (
    <section
      aria-label="Infrastructure investigation terminal"
      className="mx-auto w-full max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 font-mono text-sm text-zinc-300"
    >
      <header className="mb-6 border-b border-zinc-800 pb-4">
        <p className="font-semibold tracking-wide text-emerald-400">
          ● INVESTIGATION SESSION ACTIVE
        </p>
      </header>

      <div className="space-y-2">
        <p>
          <span className="text-zinc-500">&gt;</span>{" "}
          <span className="text-zinc-100">Target:</span>{" "}
          <span className="break-all text-zinc-300">{domain}</span>
        </p>

        <p>
          <span className="text-zinc-500">&gt;</span>{" "}
          <span className="text-zinc-300">{currentCheckpoint}</span>
        </p>
      </div>

      <div className="my-6 h-px bg-zinc-800" />

      <ul className="space-y-2">
        {TERMINAL_LOG.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>

      <div className="mt-6">
        <span
          aria-hidden="true"
          className="inline-block animate-pulse text-zinc-100"
        >
          █
        </span>
      </div>
    </section>
  );
}