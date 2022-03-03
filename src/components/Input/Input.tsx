import classNames from "classnames";
import React, { ChangeEvent, InputHTMLAttributes } from "react";
// styles
import "./Input.scss";

// setup to build a custome onChange
type PropsType = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
	onChange: Function;
	className?: string;
	error?: string;
};

// use ...rest to make sure it is dynamic
// rest can be many things like placeholder, pattern, etc.
export default function Input({
	className,
	onChange,
	error,
	...rest
}: PropsType) {
	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	const hasError = !!error;

	return (
		<div
			className={classNames("input-container", className, { error: hasError })}
		>
			<input
				className={classNames("input", { error: hasError })}
				onChange={onInputChange}
				{...rest}
			/>
			{error && <div className="error-message">{error}</div>}
		</div>
	);
}
