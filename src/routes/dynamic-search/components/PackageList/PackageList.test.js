import { render, screen } from "@testing-library/react";
// components
import PackageList, { emptyMessage } from "./PackageList";
// mocks
import mockedSearchNpmPackagesResult from "tests/mocks/data/npmPackages/searchNpmPackages.result";

const setup = ({ items = [], isEmpty = false }) => {
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
