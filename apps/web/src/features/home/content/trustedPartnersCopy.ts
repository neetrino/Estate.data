import {
  TRUSTED_PARTNER_IMAGE_PATHS,
  type TrustedPartnerImageKey,
} from "@/features/home/content/trustedPartnerAssets";

export type TrustedPartnerId = TrustedPartnerImageKey;

export type TrustedPartner = {
  readonly id: TrustedPartnerId;
  readonly name: string;
  readonly imageSrc: string;
};

export const HOME_TRUSTED_PARTNERS_COPY = {
  label: "Trusted by leading real estate teams",
  partners: [
    { id: "compass", name: "Compass", imageSrc: TRUSTED_PARTNER_IMAGE_PATHS.compass },
    { id: "sothebys", name: "Sotheby's", imageSrc: TRUSTED_PARTNER_IMAGE_PATHS.sothebys },
    { id: "the-agency", name: "The Agency", imageSrc: TRUSTED_PARTNER_IMAGE_PATHS["the-agency"] },
    {
      id: "douglas-elliman",
      name: "Douglas Elliman",
      imageSrc: TRUSTED_PARTNER_IMAGE_PATHS["douglas-elliman"],
    },
    {
      id: "coldwell-banker",
      name: "Coldwell Banker",
      imageSrc: TRUSTED_PARTNER_IMAGE_PATHS["coldwell-banker"],
    },
    {
      id: "hilton-hyland",
      name: "Hilton & Hyland",
      imageSrc: TRUSTED_PARTNER_IMAGE_PATHS["hilton-hyland"],
    },
  ] as const satisfies readonly TrustedPartner[],
} as const;
