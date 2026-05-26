import type { ClientVoiceIcon } from "@/features/home/content/clientVoicesCopy";

type ClientVoiceDecorIconProps = {
  icon: ClientVoiceIcon;
  className?: string;
};

const ICON_PATHS: Record<ClientVoiceIcon, readonly string[]> = {
  home: ["M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"],
  building: ["M6 22V4h4v18", "M14 22V10h4v12", "M22 22V2h4v20"],
  chart: ["M4 20V10", "M12 20V4", "M20 20v-8"],
};

export function ClientVoiceDecorIcon({ icon, className }: ClientVoiceDecorIconProps) {
  return (
    <svg
      className={className}
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICON_PATHS[icon].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
