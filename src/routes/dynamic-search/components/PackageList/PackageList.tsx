import React from "react";
// libraries
import InfiniteScroll from "react-infinite-scroller";
import BeatLoader from "react-spinners/BeatLoader";
// models
import { NpmPackages } from "models/npmPackages";
// components
import SinglePackage from "../SinglePackage/SinglePackage";
// styles
import "./PackageList.scss";

export const emptyMessage = "Package Not Found";

type PropsType = {
	items: NpmPackages;
	loadMore: (page?: number) => void;
	hasMore: boolean;
	isEmpty: boolean;
};

export default function PackageList({
	items,
	loadMore,
	hasMore,
	isEmpty,
}: PropsType) {
	return (
		<InfiniteScroll
			className="package-list-container"
			pageStart={0}
			loadMore={loadMore}
			// make sure there is input before loading anything
			hasMore={hasMore}
			loader={
				<div key={0} className="loader" data-testid="loader">
					<BeatLoader size={24} color="#06c" />
				</div>
			}
			threshold={100}
			initialLoad={true}
		>
			{isEmpty ? (
				<div className="package-not-found-message">
					<span>{emptyMessage}</span>
				</div>
			) : (
				<div className="package-list">
					{items.map((item) => (
						<SinglePackage key={item.name} {...item} />
					))}
				</div>
			)}
		</InfiniteScroll>
	);
}
