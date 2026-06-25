interface OpenCaseButtonProps {
  onClick?: () => void;
}

export function OpenCaseButton({
  onClick,
}: OpenCaseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-zinc-700 bg-zinc-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-colors hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      Open a Full Case File
    </button>
  );
}