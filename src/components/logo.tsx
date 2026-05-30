// DL wordmark with the saffron dot, reproduced from the brand logo.
// Drop the official export at /public/logo.svg to swap this for the vector mark.

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Dielle Communication — torna su"
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
    >
      <span className="font-serif text-lg tracking-tight text-cream">
        DL
      </span>
      <span
        aria-hidden
        className="mb-1 size-1.5 rounded-full bg-saffron transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
      />
      <span className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.24em] text-navy-dim">
        Communication
      </span>
    </a>
  );
}
