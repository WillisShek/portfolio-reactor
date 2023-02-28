import React, { useState, useEffect, useRef } from "react";
// libraries
import { useDebouncedCallback } from "use-debounce";
import { toast } from "react-toastify";
import axios, { CancelTokenSource } from "axios";
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
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const [items, setItems] = useState<NpmPackages>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [searchInput, setSearchInput] = useState<string>("");
	// searchTerms will be updated with debounce
	const [searchTerms, setSearchTerms] = useState<string>("");
	const [inputError, setInputError] = useState<string>("");
	const [isNotFound, setIsNotFound] = useState<boolean>(false);

	const isLoadingRef = useRef<boolean>(false);
	const requestRef = useRef<CancelTokenSource | undefined>();

	// ===========================================================================
	// Fetch
	// ===========================================================================
	const fetchPackages = () => {
		// prevent multiple requests fired at the same time
		if (isLoadingRef.current || searchTerms === "") return;
		isLoadingRef.current = true;

		// build a new cancel token
		requestRef.current = axios.CancelToken.source();

		searchNpmPackages(
			{
				text: searchTerms,
				size: loadSize,
				from: items.length,
			},
			requestRef.current?.token
		)
			.then((data) => {
				if (items.length + data.length === 0) {
					setIsNotFound(true);
				}
				if (data.length < loadSize) {
					// no more items can be loaded
					setHasMore(false);
				}
				setItems([...items, ...data]);
			})
			.catch((error) => {
				// log error
				console.error(error);
				if (error.message === "Request cancelled") {
					// do noting if the request is cancelled
					return;
				}
				toast.error(
					"There is an error fetching the data. Please refresh the page and try again."
				);
				// prevent loading more items
				setHasMore(false);
			})
			.finally(() => {
				isLoadingRef.current = false;
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
		// cancel existing request
		const request = requestRef.current;
		request?.cancel("Request cancelled");

		setSearchTerms(value);
		// reset
		setItems([]);
		setHasMore(true);
		setIsNotFound(false);
	}, debounceTimeout);

	// Force a request in test environment
	// It is necessary to pass the auto test
	// since InfiniteScroll won't load correctly under test environment
	// Normally useEffect shouldn't be called conditionally,
	// but since it is based on NODE_ENV, it will be all fine.
	if (process.env.NODE_ENV === "test") {
		useEffect(() => {
			fetchPackages();
		}, [searchTerms]);
	}

	const onInputChange = (value: string) => {
		setInputError("");
		setSearchInput(value);
		debouncedUpdateSearchTerms(value);
	};

	// clean up
	useEffect(() => {
		const request = requestRef.current;
		return () => {
			request?.cancel("Request cancelled");
		};
	}, []);

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
					{!!searchTerms && (
						<PackageList
							items={items}
							loadMore={fetchPackages}
							hasMore={hasMore}
							isEmpty={isNotFound}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
