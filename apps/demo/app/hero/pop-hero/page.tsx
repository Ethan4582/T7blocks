import { PopHero } from "@t7blocks/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pop Hero | T7blocks",
  description: "Pop Hero | T7blocks",
};

export default function PopHeroDemo() {
  return <PopHero />;
}