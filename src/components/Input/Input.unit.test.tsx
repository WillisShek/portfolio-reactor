import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input";

function InputForTest({ error }: { error?: string }) {
	const [value, setValue] = useState("");
	return (
		<Input
			value={value}
			onChange={setValue}
			placeholder="Type here"
			error={error}
		/>
	);
}

describe("<Input>", () => {
	it("user input successfully", () => {
		render(<InputForTest />);

		const input = screen.getByPlaceholderText("Type here");
		userEvent.type(input, "Testing");

		expect(input).toHaveValue("Testing");
	});

	it("error can be shown up correctly", () => {
		const error = "This is an error";
		render(<InputForTest error={error} />);

		expect(screen.getByText(error)).toBeInTheDocument();
	});
});
