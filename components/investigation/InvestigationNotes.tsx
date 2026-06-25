import { OpenCaseButton } from "./OpenCaseButton";
import type { DNSLookupResponse } from "@/types/api/dns";

interface InvestigationNotesProps {
  domain: string;
  dnsResult: DNSLookupResponse | null;
  error: string | null;
}

const RECORD_TYPES: Array<{
  type: keyof DNSLookupResponse["records"];
  label: string;
}> = [
  { type: "A", label: "A Records" },
  { type: "AAAA", label: "AAAA Records" },
  { type: "MX", label: "MX Records" },
  { type: "NS", label: "Nameservers" },
  { type: "TXT", label: "TXT Records" },
];

function formatRecord(record: { name: string; data: string; ttl: number }) {
  return `${record.name} — ${record.data} (TTL ${record.ttl})`;
}

export function InvestigationNotes({
  domain,
  dnsResult,
  error,
}: InvestigationNotesProps) {
  const recordSummary = dnsResult
    ? RECORD_TYPES.map(({ type, label }) => ({
        label,
        count: dnsResult.records[type].length,
        records: dnsResult.records[type],
      }))
    : [];

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
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            DNS Findings
          </h3>

          <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm leading-7">
            {error ? (
              <p className="text-amber-300">{error}</p>
            ) : dnsResult ? (
              <>
                <p className="text-zinc-400">
                  {recordSummary.reduce((total, entry) => total + entry.count, 0)} records retrieved across {recordSummary.length} DNS categories.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {recordSummary.map((entry) => (
                    <div key={entry.label}>
                      <h4 className="mb-2 text-sm font-semibold text-zinc-200">
                        {entry.label}
                      </h4>

                      {entry.records.length === 0 ? (
                        <p className="text-zinc-500">No {entry.label.toLowerCase()} returned.</p>
                      ) : (
                        <ul className="space-y-2">
                          {entry.records.map((record) => (
                            <li
                              key={`${record.type}-${record.name}-${record.data}`}
                              className="text-zinc-300"
                            >
                              {formatRecord(record)}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-zinc-500">
                DNS lookup did not return any records during this investigation.
              </p>
            )}
          </div>
        </section>

        <section className="border-t border-zinc-800 pt-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Investigator Note
          </h3>

          <div className="space-y-2 text-sm leading-7">
            <p>
              The DNS lookup provides a technical snapshot of the target’s public infrastructure.
            </p>

            <p>
              If the lookup returns no records, verify the target domain and repeat the investigation.
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