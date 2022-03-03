import React from "react";
// libraries
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// routes
import { routes } from "routes";
// styles
import "./Navigator.scss";

export default function Navigator() {
	return (
		<div className="navigator">
			{routes.map((route) => {
				if (route.params?.navigator) {
					return (
						<NavLink
							key={route.path}
							to={route.path}
							className={({ isActive }) =>
								classNames("nav-link", { active: isActive })
							}
						>
							<span>{route.params.name}</span>
						</NavLink>
					);
				}
				return null;
			})}
		</div>
	);
}
