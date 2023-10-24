export class PageError extends Error {
	// @ts-ignore
	private header: string;

	constructor(message: string, header: string) {
		super(message);

		this.name = "PageError";
		this.message = message;
		this.header = header;
	}
}
