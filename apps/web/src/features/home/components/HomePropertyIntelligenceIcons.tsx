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

export function PropertyIntelligenceSecureIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 5 6v6c0 3.5 2.8 6.2 7 7 4.2-.8 7-3.5 7-7V6l-7-3z" />
      <path d="M9.5 12.5 11.5 14.5 15 10.5" />
    </svg>
  );
}

export function PropertyIntelligenceScalableIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 18V8l4-2 4 2v10M12 18V6l4-2 4 2v12" />
      <path d="M8 10h0M16 8h0" />
    </svg>
  );
}

export function PropertyIntelligenceTrustedIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 4 14.8 9.2 21 10l-4.5 4.1 1.2 6.7L12 17.8 6.3 20.8 7.5 14.1 3 10l6.2-.8L12 4z" />
    </svg>
  );
}
