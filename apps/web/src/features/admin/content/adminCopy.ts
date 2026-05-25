export const ADMIN_LOGIN_COPY = {
  eyebrow: "Admin access",
  title: "Sign in",
  subtitle: "Use your admin email and password to open the control panel.",
  emailLabel: "Email",
  emailPlaceholder: "admin@estate.data",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  submitLabel: "Sign in",
  submittingLabel: "Signing in…",
  genericError: "Invalid email or password. Please try again.",
} as const;

export const ADMIN_PANEL_COPY = {
  title: "Admin panel",
  subtitle: "Manage site content and media from one place.",
  logoutLabel: "Sign out",
  sectionsTitle: "Content areas",
  sections: [
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Projects, categories, and featured home tiles.",
    },
    {
      id: "articles",
      title: "Articles",
      description: "Resources blog posts and localized content.",
    },
    {
      id: "faq",
      title: "FAQ",
      description: "Questions and answers on the resources page.",
    },
    {
      id: "pricing",
      title: "Pricing",
      description: "Packages, categories, and subscription tiers.",
    },
    {
      id: "assets",
      title: "Assets & media",
      description: "Upload images and files to R2 or the asset store.",
    },
  ],
} as const;
