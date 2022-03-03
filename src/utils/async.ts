export async function sleep(timeout: number) {
	await new Promise((r) => setTimeout(r, timeout));
}
