type IconProps = {
  className?: string;
};

export function PropertyIntelligenceCheckIcon({ className = "size-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 12.5 10 16.5 18 8" />
    </svg>
  );
}
