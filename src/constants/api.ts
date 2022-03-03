import config from "config/config";

const { NPM_API_ROOT } = config;

export const endpoints = {
	SEARCH_NPM_PACKAGES: `${NPM_API_ROOT}/-/v1/search`,
};
