export const ADMIN_LOGIN_COPY = {
  brandName: "ESTATE DATA",
  eyebrow: "WEBSITE EDITOR",
  title: "Sign in",
  subtitle: "Enter your email and password to open the website editor.",
  emailLabel: "Email",
  emailPlaceholder: "admin@ed.com",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter your password",
  submitLabel: "Sign in",
  submittingLabel: "Signing in…",
  securePortalLabel: "Private sign-in",
  showPasswordLabel: "Show password",
  hidePasswordLabel: "Hide password",
  rememberMeLabel: "Remember my email",
  forgotPasswordLabel: "Forgot password?",
  homeButtonLabel: "Back to the website",
  genericError: "That email or password is not right. Try again.",
} as const;

/** localStorage key — email hint only; does not affect auth/session. */
export const ADMIN_LOGIN_REMEMBER_EMAIL_KEY = "estate.admin-login.remember-email";

export const ADMIN_SHOW_ON_WEBSITE_LABEL = "Show on the website";
export const ADMIN_VISIBLE_BADGE = "Visible";
export const ADMIN_HIDDEN_BADGE = "Hidden";
export const ADMIN_POSITION_LABEL = "Position";
export const ADMIN_POSITION_HINT = "Smaller number appears first. 1 is at the top.";
export const ADMIN_POSITION_ERROR = "Position must be 0 or a bigger number.";
export const ADMIN_HIDE_ON_WEBSITE_LABEL = "Hide on website";
export const ADMIN_SHOW_ON_WEBSITE_ACTION = "Show on website";

export const CONTACT_FIELD_MODE_LABELS = {
  required: "Required — they must fill this in",
  optional: "Optional — they can skip this",
  hidden: "Hidden — do not show this field",
} as const;
