import {createDownloadToken, generateDownloadLink} from "src/helpers/linkGenerator";
import {describe, expect, test} from '@jest/globals';
import * as process from 'process'

describe('Testing /backend/helpers/', () => {
	test('...LinkGenerator.test.ts: createDownloadToken', () => {
		const payload: { id: number, content: string } = {id: 1, content: "test"};
		const token: string = createDownloadToken(payload, "1h");

		const jwtRegex: RegExp = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

		expect(typeof token).toBe("string");
		expect(jwtRegex.test(token)).toBe(true);
	});

	test('...generateDownloadLink.test.ts: generateDownloadLink', () => {
		const FRONTEND_URL: string = process.env.FRONTEND_URL!;
		expect(generateDownloadLink("test")).toBe(FRONTEND_URL + "/access/download?token=test");
	});
});
