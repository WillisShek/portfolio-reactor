import React from "react";
// libraries
import { HashRouter, useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
// routes
import { purifiedRoutes } from "routes";
// components
import SiteHeader from "components/SiteHeader/SiteHeader";
// styles
import "./App.scss";

function App() {
	const renderedRoutes = useRoutes(purifiedRoutes);

	return (
		<div id="app">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<SiteHeader />
			<div className="body">{renderedRoutes}</div>
		</div>
	);
}

function AppWithProvider() {
	return (
		<HashRouter>
			<App />
		</HashRouter>
	);
}

export default AppWithProvider;
