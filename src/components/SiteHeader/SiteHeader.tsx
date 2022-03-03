import React from "react";
// libraries
import { useNavigate } from "react-router-dom";
import { MdHome } from "react-icons/md";
// routes
import { useMatchedRoute } from "routes";
// styles
import "./SiteHeader.scss";

export default function SiteHeader() {
	const navigate = useNavigate();

	const matchedRoute = useMatchedRoute();

	return (
		<div className="site-header">
			<div className="home">
				<MdHome className="icon" size="1.4em" onClick={() => navigate("/")} />
			</div>
			<div className="title">
				<span>{matchedRoute?.params.name || "Not Found"}</span>
			</div>
			<div className="author">
				<span>
					By:
					<br />
					Willis SHEK
				</span>
			</div>
		</div>
	);
}
