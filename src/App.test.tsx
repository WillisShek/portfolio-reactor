import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

it("App render correctly", () => {
	render(<App />);
	const title = screen.getByText(/Willis SHEK/i);
	expect(title).toBeInTheDocument();
});
