import type { Route } from "./+types/home";
import SliderPage from "~/slider/slider.page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Slider page" },
    { name: "description", content: "Strt customize your slider" },
  ];
}

export default function Slider() {
  return <SliderPage />;
}
