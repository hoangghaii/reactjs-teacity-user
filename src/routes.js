import { lazy } from "react";

const Home = lazy(() => import("./containers/main/section/home/Home"));
const Location = lazy(() =>
	import("./containers/main/section/location/location")
);

const routes = [
	{ path: "/home", name: "Home", component: Home },
	{ path: "/location", name: "Location", component: Location },
	{ path: "/", name: "Home", component: Home },
];

export default routes;
