import { RouteObject as ReactRouteObject } from "react-router-dom";

export type RouteParams = { name: string; navigator?: boolean };

export type RouteParamsIndex = {
	[key: string]: RouteParams;
};

export type RouteObject = ReactRouteObject & {
	path: string;
	params?: RouteParams;
};
