export type ClientVoice = {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
};

export const HOME_CLIENT_VOICES_COPY = {
  eyebrow: "VOICES",
  title: "What clients say",
  testimonials: [
    {
      id: "maya-chen",
      quote:
        "The cinematic films lifted listing engagement 3x. Their drone work in the Palisades is unmatched.",
      name: "Maya Chen",
      role: "Broker, The Agency",
    },
    {
      id: "david-ortiz",
      quote:
        "BIM-ready scans in 48 hours saved our team weeks. The dashboards are now central to investor reporting.",
      name: "David Ortiz",
      role: "Developer, DTLA",
    },
    {
      id: "priya-shah",
      quote:
        "I trust Estate Data's market intel. The data layer is what makes them different.",
      name: "Priya Shah",
      role: "Investor",
    },
  ] as const satisfies readonly ClientVoice[],
} as const;
