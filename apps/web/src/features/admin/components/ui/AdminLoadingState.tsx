export function AdminLoadingState({ label = "Loading…" }: { readonly label?: string }) {
  return <p className="text-sm text-muted-foreground">{label}</p>;
}
