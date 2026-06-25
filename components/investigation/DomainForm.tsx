import type { FormEvent } from "react";

interface DomainFormProps {
  domain: string;
  disabled: boolean;
  onDomainChange: (value: string) => void;
  onSubmit: () => void;
}

export function DomainForm({
  domain,
  disabled,
  onDomainChange,
  onSubmit,
}: DomainFormProps) {
  const isSubmitDisabled = disabled || domain.trim() === "";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-6"
    >
      <div className="space-y-2">
        <label
          htmlFor="domain"
          className="block text-sm font-medium text-zinc-300"
        >
          Domain
        </label>

        <input
          id="domain"
          name="domain"
          type="url"
          inputMode="url"
          value={domain}
          autoComplete="off"
          spellCheck={false}
          placeholder="Enter domain to generate preliminary case file"
          aria-label="Domain"
          onChange={(event) => onDomainChange(event.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-700"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="rounded-lg border border-zinc-700 bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-zinc-800 disabled:text-zinc-500"
      >
        Generate Preliminary Case File
      </button>
    </form>
  );
}