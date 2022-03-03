import React from "react";
import moment from "moment";
import { date_format } from "constants/date";
import { NpmPackage } from "models/npmPackages";

import "./SinglePackage.scss";

export default function SinglePackage({
	name,
	author,
	date,
	link,
}: NpmPackage) {
	return (
		<a className="package-single" href={link} target="_blank" rel="noreferrer">
			<div className="name">
				<span>{name}</span>
			</div>
			{author && (
				<div className="author">
					<span>By: {author}</span>
				</div>
			)}
			<div className="date">
				<span>last update: {moment(date).format(date_format.DISPLAY)}</span>
			</div>
		</a>
	);
}
