import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({ jsxImportSource: "@emotion/react" }),
		inject({
			process: "process/browser",
		}),
	],
	resolve: {
		alias: {
			process: "process/browser",
		},
	},
});
