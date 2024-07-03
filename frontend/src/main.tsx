import React from "react";
import App from "./App";
import {
	createBrowserRouter,
	RouterProvider,
	RouteObject,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { mainTheme } from "../colors.ts";
import process from "process";

window.process = process;

const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		children: [{}],
	},
];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById("root");

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<React.StrictMode>
			<ConfigProvider theme={mainTheme}>
				<RouterProvider router={router} />
			</ConfigProvider>
		</React.StrictMode>
	);
} else {
	console.error("Failed to find the root element");
}
