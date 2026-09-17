const PACKAGE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PricingPackageFieldKey = "id" | "name" | "price" | "features";

export type PricingPackageFieldErrors = Partial<Record<PricingPackageFieldKey, string>>;

type PricingPackageFormInput = {
  readonly isCreate: boolean;
  readonly id: string;
  readonly name: string;
  readonly price: string;
  readonly features: string;
};

function hasFeatureLines(features: string): boolean {
  return features
    .split("\n")
    .map((line) => line.trim())
    .some((line) => line.length > 0);
}

/** Field-level checks before POST/PATCH pricing packages. */
export function validatePricingPackageForm(
  input: PricingPackageFormInput,
): PricingPackageFieldErrors {
  const errors: PricingPackageFieldErrors = {};

  if (input.isCreate) {
    const id = input.id.trim();
    if (!id) {
      errors.id = "Package id is required.";
    } else if (!PACKAGE_ID_PATTERN.test(id)) {
      errors.id = "Use lowercase letters, numbers, and hyphens.";
    }
  }

  if (!input.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!input.price.trim()) {
    errors.price = "Price is required.";
  }
  if (!hasFeatureLines(input.features)) {
    errors.features = "Add at least one feature.";
  }

  return errors;
}

export function pricingPackageFieldFromApiMessage(message: string): PricingPackageFieldKey | null {
  if (/already exists|must be unique|package id/i.test(message)) {
    return "id";
  }
  return null;
}
