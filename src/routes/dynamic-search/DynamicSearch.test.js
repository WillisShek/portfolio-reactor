import React from "react";
// libraries
import { render, screen } from "@testing-library/react";

// components
import DynamicSearch from "./DynamicSearch";
// mocks
import mock from "tests/utils/mockAxios";

// jest.mock("./constants/searchParams", () => {
// 	return {
// 		// hugely reduce timeout to speed up test
// 		debounceTimeout: 10,
// 		loadSize: 20,
// 		searchInputMinimalLength: 3,
// 	};
// });

const setup = () => {
	render(<DynamicSearch />);
	const input = screen.getByTestId("search-input");
	return input;
};

describe("<DynamicSearch />", () => {
	afterEach(() => {
		mock.reset();
	});

	it("render correctly", async () => {
		const input = setup();
		expect(input).toBeInTheDocument();
	});

	// The below test cannot be run since InfiniteScroller requires a real viewport to trigger its loadMore function.
	// You may add fetchPackages to the existing useEffect to make it "works", but it will break other features.
	// Before finding a proper way to tigger loadMore, the below and the above jest.mock should be commented
	// it("display right packages", async () => {
	// 	const input = setup();

	// 	mockSearchNpmPackages();

	// 	userEvent.type(input, "react");
	// 	await sleep(sleepTime);

	// 	expect(screen.getByText(/rxjs/i)).toBeInTheDocument();

	// 	mock.reset();
	// 	mockSearchNpmPackages({ objects: [] });

	// 	userEvent.type(input, "sffefsdfdss");
	// 	await sleep(sleepTime);

	// 	expect(screen.getByText(emptyMessage)).toBeInTheDocument();
	// });
});
