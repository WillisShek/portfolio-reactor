import axios, { CancelToken } from "axios";
import { endpoints } from "constants/api";

import { NpmPackages, NpmPackageFromAPI } from "models/npmPackages";

// Get the packages from npm
export function searchNpmPackages(
	{
		text,
		size = 20,
		from = 0,
	}: {
		text?: string;
		size?: number;
		from?: number;
	},
	cancelToken: CancelToken
): Promise<NpmPackages> {
	const url = endpoints.SEARCH_NPM_PACKAGES;

	return axios
		.get(url, {
			params: { text, size, from },
			cancelToken: cancelToken,
		})
		.then((res) => {
			const { objects } = res.data;

			// process the response and only include things that we need
			const data = objects.map((datum: NpmPackageFromAPI) => {
				const packInfo = datum.package;
				return {
					name: packInfo.name,
					author: packInfo.author?.name,
					date: packInfo.date,
					link: packInfo.links.npm,
				};
			});

			return data;
		});
}
