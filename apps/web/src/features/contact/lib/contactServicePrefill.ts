import type { ContactServiceValue } from "@/features/contact/content/contactFieldConfig";

type ContactServiceListener = (service: ContactServiceValue) => void;

const listeners = new Set<ContactServiceListener>();

/** Ask the mounted contact form to tick a service checkbox (used by example popups). */
export function requestContactService(service: ContactServiceValue): void {
  for (const listener of listeners) {
    listener(service);
  }
}

/** Subscribe the contact form to prefill requests; returns the unsubscribe callback. */
export function subscribeContactService(listener: ContactServiceListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
