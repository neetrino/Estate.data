export const ADMIN_LOGIN_COPY = {
  brandName: "ESTATE DATA",
  eyebrow: "ADMIN ACCESS",
  title: "Sign in",
  subtitle:
    "Use your admin email and password to access the control panel.",
  emailLabel: "Email",
  emailPlaceholder: "admin@estate.data",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  submitLabel: "Sign in",
  submittingLabel: "Signing in…",
  securePortalLabel: "Secure admin portal",
  showPasswordLabel: "Show password",
  hidePasswordLabel: "Hide password",
  rememberMeLabel: "Remember me",
  forgotPasswordLabel: "Forgot password?",
  homeButtonLabel: "Back to home",
  genericError: "Invalid email or password. Please try again.",
} as const;

/** localStorage key — email hint only; does not affect auth/session. */
export const ADMIN_LOGIN_REMEMBER_EMAIL_KEY = "estate.admin-login.remember-email";

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
