import type { AdminTabItem } from "@/features/admin/components/ui/AdminTabs";

export type ServiceEditorTabId = "words" | "picture" | "tour" | "prices" | "example" | "button";

/** Tabs for one studio-service editor. Picture and 3D tour only when that service has them. */
export function serviceEditorTabs(
  showImage: boolean,
  showTour: boolean,
): AdminTabItem<ServiceEditorTabId>[] {
  const tabs: AdminTabItem<ServiceEditorTabId>[] = [
    { id: "words", label: "Words", hint: "The small label, title, and description visitors read." },
  ];
  if (showImage) {
    tabs.push({
      id: "picture",
      label: "Picture",
      hint: "The main photo for this service.",
    });
  }
  if (showTour) {
    tabs.push({
      id: "tour",
      label: "3D tour",
      hint: "The Matterport tour on the public Tours section.",
    });
  }
  tabs.push(
    {
      id: "prices",
      label: "Prices",
      hint: "What is included and the price list.",
    },
    {
      id: "example",
      label: "Example",
      hint: "The popup visitors see when they press View Example.",
    },
    {
      id: "button",
      label: "Button",
      hint: "The button on this service and where it sits on the page.",
    },
  );
  return tabs;
}
