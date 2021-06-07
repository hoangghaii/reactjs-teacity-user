import { lazy } from "react";

const Home = lazy(() => import("./containers/main/section/home/Home"));
const Cookie = lazy(() => import("./containers/main/section/cookie/cookie"));
const FruitTea = lazy(() =>
	import("./containers/main/section/fruit-tea/fruit-tea")
);
const Location = lazy(() =>
	import("./containers/main/section/location/location")
);
const MilkTea = lazy(() =>
	import("./containers/main/section/milk-tea/milk-tea")
);

const routes = [
	{ path: "/home", name: "Home", component: Home },
	{ path: "/cookie", name: "Cookie", component: Cookie },
	{ path: "/fruit-tea", name: "FruitTea", component: FruitTea },
	{ path: "/location", name: "Location", component: Location },
	{ path: "/milk-tea", name: "MilkTea", component: MilkTea },
	{ path: "/", name: "Home", component: Home },
];

export default routes;
