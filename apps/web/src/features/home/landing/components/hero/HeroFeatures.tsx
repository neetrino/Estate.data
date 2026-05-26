import Image from "next/image";
import { HOME_FEATURE_HIGHLIGHTS_COPY } from "@/features/home/content/featureHighlightsCopy";
import {
  HERO_FEATURES_COPY_CLASS,
  HERO_FEATURES_ICON_CLASS,
  HERO_FEATURES_ITEM_CLASS,
  HERO_FEATURES_ROOT_CLASS,
  HERO_FEATURES_SUBTITLE_CLASS,
  HERO_FEATURES_TITLE_CLASS,
} from "@/features/home/landing/lib/heroFeaturesStyles";
import {
  HERO_FEATURE_ICON_PATHS,
  HERO_FEATURE_ICON_SIZE_PX,
} from "@/features/home/landing/lib/heroFeatureIcons";

export function HeroFeatures() {
  return (
    <ul className={HERO_FEATURES_ROOT_CLASS}>
      {HOME_FEATURE_HIGHLIGHTS_COPY.items.map((item) => (
        <li key={item.id} className={HERO_FEATURES_ITEM_CLASS}>
          <Image
            src={HERO_FEATURE_ICON_PATHS[item.icon]}
            alt=""
            width={HERO_FEATURE_ICON_SIZE_PX}
            height={HERO_FEATURE_ICON_SIZE_PX}
            className={HERO_FEATURES_ICON_CLASS}
          />
          <div className={HERO_FEATURES_COPY_CLASS}>
            <p className={HERO_FEATURES_TITLE_CLASS}>{item.title}</p>
            <p className={HERO_FEATURES_SUBTITLE_CLASS}>{item.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
