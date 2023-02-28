import mock from "tests/utils/mockAxios";
import { endpoints } from "constants/api";
// mocks
import mockedSearchNpmPackages from "tests/mocks/data/npmPackages/searchNpmPackages.json";
import mockedSearchNpmPackagesResult from "tests/mocks/data/npmPackages/searchNpmPackages.result";

export const mockSearchNpmPackages = (
	searchTerms: string,
	result = mockedSearchNpmPackages
) => {
	const payload = { text: searchTerms };
	return mock
		.onGet(endpoints.SEARCH_NPM_PACKAGES, {
			params: { size: 20, from: 0, ...payload },
		})
		.reply(200, result);
};

export { mockedSearchNpmPackages, mockedSearchNpmPackagesResult };
