// contain only the necessary structures of a package object
export type NpmPackage = {
	name: string;
	// some package has no author, e.g. react
	author?: string;
	date: string;
	link: string;
};

export type NpmPackages = NpmPackage[];

export type NpmPackageFromAPI = {
	package: {
		name: string;
		// some package has no author, e.g. react
		author?: {
			name: string;
			// we don't care about the rest
			[key: string]: unknown;
		};
		date: string;
		links: {
			npm: string;
			[key: string]: unknown;
		};
		[key: string]: unknown;
	};
	[key: string]: unknown;
};
