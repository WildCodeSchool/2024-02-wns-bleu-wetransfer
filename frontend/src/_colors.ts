import {ThemeConfig} from "antd";

export const colors = {
	darkPurple: '#0A0025',
	lightPurple: '#65558F',
	mainOrange: '#FF9518',
	white: '#FFFFFF'
}

export const mainTheme: ThemeConfig = {
	token: {
		colorPrimary: colors.mainOrange,
		borderRadius: 10,
	},
}