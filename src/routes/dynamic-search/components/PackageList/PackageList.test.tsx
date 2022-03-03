import React from "react";
// libraries
import { render, screen } from "@testing-library/react";
// models
import { NpmPackages } from "models/npmPackages";
// components
import PackageList, { emptyMessage } from "./PackageList";
// mocks
import mockedSearchNpmPackagesResult from "tests/mocks/data/npmPackages/searchNpmPackages.result";

const setup = ({
	items = [],
	isEmpty = false,
}: {
	items?: NpmPackages;
	isEmpty?: boolean;
}) => {
	const loadMore = jest.fn(() => Promise.resolve([]));
	render(
		<PackageList
			items={items}
			hasMore={false}
			loadMore={loadMore}
			isEmpty={isEmpty}
		/>
	);
};

describe("<PackageList/>", () => {
	it("can display packages correctly", () => {
		setup({ items: mockedSearchNpmPackagesResult });

		expect(screen.getByText("react")).toBeInTheDocument();
	});

	it("can display the not found text correctly", () => {
		setup({ isEmpty: true });

		expect(screen.getByText(emptyMessage)).toBeInTheDocument();
	});
});
