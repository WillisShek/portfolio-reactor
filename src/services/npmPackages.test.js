import { searchNpmPackages } from "./npmPackages";
// mocks
import mock from "tests/utils/mockAxios";
import {
	mockSearchNpmPackages,
	mockedSearchNpmPackagesResult,
} from "tests/mocks/quickMocks/npmPackages";

describe("npmPackages:", () => {
	afterEach(() => {
		mock.reset();
	});
	it("searchNpmPackages is can return data correctly", async () => {
		const payload = { text: "react" };

		mockSearchNpmPackages();

		const result = await searchNpmPackages(payload);

		expect(result).toEqual(mockedSearchNpmPackagesResult);
	});
});
