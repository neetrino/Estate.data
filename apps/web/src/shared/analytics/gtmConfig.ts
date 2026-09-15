const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;

/** Valid GTM container id from env, or null when unset / malformed. */
export function resolveGtmId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  if (!raw || !GTM_ID_PATTERN.test(raw)) {
    return null;
  }
  return raw;
}
