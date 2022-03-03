import React from "react";
// libraries
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// constants
import { debounceTimeout } from "./constants/searchParams";
// components
import DynamicSearch from "./DynamicSearch";
// mocks
import mock from "tests/utils/mockAxios";
import { mockSearchNpmPackages } from "tests/mocks/quickMocks/npmPackages";
import { sleep } from "utils/async";
import { emptyMessage } from "./components/PackageList/PackageList";

jest.mock("./constants/searchParams", () => {
	return {
		// hugely reduce timeout to speed up test
		debounceTimeout: 10,
		loadSize: 20,
		searchInputMinimalLength: 3,
	};
});

const sleepTime = debounceTimeout;

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

	it("display right packages", async () => {
		const input = setup();

		const searchTerms = "react";
		mockSearchNpmPackages(searchTerms);

		userEvent.type(input, searchTerms);
		await sleep(sleepTime);

		await waitFor(() => {
			expect(screen.getByText("rxjs")).toBeInTheDocument();
		});
	});

	it("display empty message", async () => {
		const input = setup();

		const searchTerms = "sffefsdfdss";
		mockSearchNpmPackages(searchTerms, {
			objects: [],
			total: 0,
			time: "Thu Mar 03 2022 02:54:19 GMT+0000 (Coordinated Universal Time)",
		});

		userEvent.type(input, searchTerms);
		await sleep(sleepTime);

		await waitFor(() => {
			expect(screen.getByText(emptyMessage)).toBeInTheDocument();
		});
	});
});
