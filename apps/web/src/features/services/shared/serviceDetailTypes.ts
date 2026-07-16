type ServiceMetric = {
  readonly label: string;
  readonly value: string;
};

type ServiceHighlight = {
  readonly title: string;
  readonly description: string;
};

type ServiceWorkflowStep = {
  readonly title: string;
  readonly description: string;
};

type ServicePackage = {
  readonly name: string;
  readonly turnaround: string;
  readonly startingAt: string;
  readonly inclusions: readonly string[];
};

type ServiceFaq = {
  readonly question: string;
  readonly answer: string;
};

type ServiceVisualImage = {
  readonly src: string;
  readonly alt: string;
};

export type ServiceDetailCopy = {
  readonly title: string;
  readonly description: string;
  readonly heroLabel: string;
  readonly serviceSummary: string;
  readonly heroImage: ServiceVisualImage;
  readonly gallery: readonly ServiceVisualImage[];
  readonly metrics: readonly ServiceMetric[];
  readonly highlights: readonly ServiceHighlight[];
  readonly workflow: readonly ServiceWorkflowStep[];
  readonly packages: readonly ServicePackage[];
  readonly faq: readonly ServiceFaq[];
};

export type ServiceDetailCopyMap = Record<string, ServiceDetailCopy>;
