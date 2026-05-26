export type ClientVoiceIcon = "home" | "building" | "chart";

export type ClientVoice = {
  readonly id: string;
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly icon: ClientVoiceIcon;
};

export const HOME_CLIENT_VOICES_COPY = {
  eyebrow: "VOICES",
  title: "What clients say",
  subtitle:
    "Trusted by brokers, developers, and investors to power smarter decisions in real estate.",
  testimonials: [
    {
      id: "maya-chen",
      quote:
        "The cinematic films lifted listing engagement 3x. Their drone work in the Palisades is unmatched.",
      name: "Maya Chen",
      role: "Broker, The Agency",
      icon: "home",
    },
    {
      id: "david-ortiz",
      quote:
        "BIM-ready scans in 48 hours saved our team weeks. The dashboards are now central to investor reporting.",
      name: "David Ortiz",
      role: "Developer, DTLA",
      icon: "building",
    },
    {
      id: "priya-shah",
      quote:
        "I trust Estate Data's market intel. The data layer is what makes them different.",
      name: "Priya Shah",
      role: "Investor",
      icon: "chart",
    },
  ] as const satisfies readonly ClientVoice[],
} as const;
