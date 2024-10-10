import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ConfigProvider} from "antd";
import {mainTheme} from "./_colors.ts";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {GlobalStyles} from "./globalStyles.tsx";

const client = new ApolloClient({
	uri: "/graphql",
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ConfigProvider theme={mainTheme}>
				<GlobalStyles/>
				<App/>
			</ConfigProvider>
		</ApolloProvider>
	</React.StrictMode>
);