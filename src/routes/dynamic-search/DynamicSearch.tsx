import React, { useState, useEffect, useRef } from "react";
// libraries
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import axios from "axios";
// models
import { NpmPackages } from "models/npmPackages";
// constants
import {
	debounceTimeout,
	loadSize,
	searchInputMinimalLength,
} from "./constants/searchParams";
// components
import PackageList from "./components/PackageList/PackageList";
import Input from "components/Input/Input";
// services
import { searchNpmPackages } from "services/npmPackages";
// styles
import "./DynamicSearch.scss";

export default function DynamicSearch() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [items, setItems] = useState<NpmPackages>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [searchInput, setSearchInput] = useState<string>("");
	// searchTerms will be updated with debounce
	const [searchTerms, setSearchTerms] = useState<string>("");

	const [inputError, setInputError] = useState<string>("");

	const [isNotFound, setIsNotFound] = useState<boolean>(false);

	const requestRef = useRef(axios.CancelToken.source());

	// ===========================================================================
	// Fetch
	// ===========================================================================
	const fetchPackages = () => {
		if (isLoading || searchTerms === "") return;
		setIsLoading(true);
		searchNpmPackages({
			text: searchTerms,
			size: loadSize,
			from: items.length,
		})
			.then((data) => {
				if (items.length + data.length === 0) {
					setIsNotFound(true);
				}
				if (data.length < loadSize) {
					// no more item can be loaded
					setHasMore(false);
				}
				setItems([...items, ...data]);
			})
			.catch((error) => {
				console.error(error);
				toast.error(
					"There is an error fetching the data. Please refresh the page and try again."
				);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// ===========================================================================
	// Search input
	// ===========================================================================
	const debouncedUpdateSearchTerms = useDebouncedCallback((value) => {
		if (value.length < searchInputMinimalLength) {
			setInputError(
				`Please input at least ${searchInputMinimalLength} characters`
			);
			return;
		}
		setSearchTerms(value);
	}, debounceTimeout);

	const onInputChange = (value: string) => {
		setInputError("");
		setSearchInput(value);
		debouncedUpdateSearchTerms(value);
	};

	useEffect(
		() => {
			// reset items and has more
			setItems([]);
			setHasMore(true);
			setIsNotFound(false);

			const request = requestRef.current;
			return () => {
				request.cancel("Request cancelled");
			};
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[searchTerms]
	);

	return (
		<div className="dynamic-search">
			<div className="npm-packages">
				<Input
					value={searchInput}
					onChange={onInputChange}
					placeholder="Type here to search NPM packages"
					error={inputError}
					data-testid="search-input"
				/>
				<div className="search-result">
					<PackageList
						items={items}
						loadMore={fetchPackages}
						hasMore={!!searchTerms && hasMore}
						isEmpty={isNotFound}
					/>
				</div>
			</div>
		</div>
	);
}
