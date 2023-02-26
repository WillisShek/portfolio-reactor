import React from "react";
import {
	RouteObject as ReactRouteObject,
	matchRoutes,
	useLocation,
} from "react-router-dom";
// models
import { RouteObject, RouteParamsIndex } from "models/routes";
// components
import Home from "./home/Home";
import DynamicSearch from "./dynamic-search/DynamicSearch";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
		params: { name: "Home", navigator: true },
	},
	{
		path: "dynamic-search",
		element: <DynamicSearch />,
		params: { name: "Dynamic Search", navigator: true },
	},
];

// routes that will be sent to useRoutes
// caution: handle nested routes if any
export const purifiedRoutes: ReactRouteObject[] = routes.map(
	({ params, ...rest }) => rest
);

function constructRouteParamsIndex(): RouteParamsIndex {
	const index: RouteParamsIndex = {};
	routes.forEach(({ params, ...rest }) => {
		if (params) {
			const path = rest.path.startsWith("/") ? rest.path : `/${rest.path}`;
			index[path] = params;
		}
	});

	return index;
}

const routeParamsIndex = constructRouteParamsIndex();

export function useMatchedRoute() {
	const location = useLocation();
	const matchedRoutes = matchRoutes(routes, location.pathname);
	const firstMatch = matchedRoutes?.[0];
	if (firstMatch) {
		const path = firstMatch.pathname;

		return { ...firstMatch, params: routeParamsIndex[path] };
	}
}
