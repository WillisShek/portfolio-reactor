import { act } from "react-dom/test-utils";

export async function sleep(timeout: number) {
	await act(async () => {
		await new Promise((r) => setTimeout(r, timeout));
	});
}
