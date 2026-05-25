export type AdminLoginPayload = {
  readonly email: string;
  readonly password: string;
};

export type AdminAuthResult = {
  readonly token: string;
  readonly expiresIn: string;
};
