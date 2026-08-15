import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree.js";
import AuthPage from "../pages/AuthPage.jsx";

export const authRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/auth",

	validateSearch: (search) => ({
		mode: search.mode === "register" ? "register" : "login",
	}),

	component: AuthPage,
});

1; // import { createRoute } from "@tanstack/react-router"
// import { rootRoute } from "./routeTree.js"
// import AuthPage from "../pages/AuthPage.jsx"

// export const authRoute = createRoute({
//     getParentRoute: () => rootRoute,
//     path: '/auth',
//     component: AuthPage,
//   })
