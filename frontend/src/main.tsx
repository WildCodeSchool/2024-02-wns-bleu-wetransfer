import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ConfigProvider} from "antd";
import {mainTheme} from "./_colors.ts";
import {AuthProvider} from "./context/AuthContext.tsx";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ConfigProvider theme={mainTheme}>
			<AuthProvider>
				<App/>
			</AuthProvider>
		</ConfigProvider>
	</React.StrictMode>
);