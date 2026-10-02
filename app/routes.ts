import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("sliders", "routes/slider.tsx"),
] satisfies RouteConfig;
