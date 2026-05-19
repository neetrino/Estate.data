import { ASSET_KEYS, assetUrl } from "@estate/db";

const PHONE_ICON_MASK_URL = assetUrl(ASSET_KEYS.navPhoneIcon);

const PHONE_ICON_MASK_STYLE = {
  WebkitMaskImage: `url(${PHONE_ICON_MASK_URL})`,
  maskImage: `url(${PHONE_ICON_MASK_URL})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

type PhoneIconProps = {
  className?: string;
};

/** Navbar phone icon — served from DB via `/api/v1/assets/*`. */
export function PhoneIcon({ className }: PhoneIconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
      style={PHONE_ICON_MASK_STYLE}
    />
  );
}
