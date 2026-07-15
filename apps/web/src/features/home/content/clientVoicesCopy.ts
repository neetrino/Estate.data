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
    "Trusted by brokers, developers, and investors for premium real estate media delivery.",
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
        "The video and aerial package helped us launch faster and present the project with confidence.",
      name: "David Ortiz",
      role: "Developer, DTLA",
      icon: "building",
    },
    {
      id: "priya-shah",
      quote:
        "Their quality and consistency make every listing presentation look world-class.",
      name: "Priya Shah",
      role: "Investor",
      icon: "chart",
    },
  ] as const satisfies readonly ClientVoice[],
} as const;
