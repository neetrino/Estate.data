import "@/shared/components/footer/footer-page-bridge.css";

type FooterPageBridgeProps = {
  /** Page tone above the footer — home listing CTA ends on lavender; /media on white. */
  from: "white" | "surface";
};

export function FooterPageBridge({ from }: FooterPageBridgeProps) {
  const variantClass =
    from === "white" ? "page-footer-bridge--from-white" : "page-footer-bridge--from-surface";

  return <div className={`page-footer-bridge ${variantClass}`} aria-hidden />;
}
