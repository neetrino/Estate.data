const SENTENCE_END = ". ";

export type LeadParagraph = {
  readonly lead: string;
  /** Remaining sentences, or null when the text is a single sentence. */
  readonly rest: string | null;
};

/**
 * Splits a stored one-field description into an intro sentence and the
 * supporting paragraph the reference layout renders at a smaller size.
 */
export function splitLeadParagraph(description: string): LeadParagraph {
  const boundary = description.indexOf(SENTENCE_END);

  if (boundary === -1) {
    return { lead: description, rest: null };
  }

  return {
    lead: description.slice(0, boundary + 1),
    rest: description.slice(boundary + SENTENCE_END.length),
  };
}
