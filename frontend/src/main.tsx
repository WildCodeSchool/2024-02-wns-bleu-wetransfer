import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ConfigProvider} from "antd";
import {mainTheme} from "./_colors.ts";
import {AuthProvider} from "./context/AuthContext.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ConfigProvider theme={mainTheme}>
				<AuthProvider>
					<App/>
				</AuthProvider>
			</ConfigProvider>
		</ApolloProvider>
	</React.StrictMode>
);