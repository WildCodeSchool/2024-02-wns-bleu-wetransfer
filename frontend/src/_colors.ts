import {ThemeConfig} from "antd";

export const colors = {
	darkPurple: '#0A0025',
	lightPurple: '#65558F',
	mainOrange: '#FF9518',
	white: '#FFFFFF',
	black: '#000',
	transparentPurple: 'rgba(158,135,225,0.25)'
}

export const mainTheme: ThemeConfig = {
	token: {
		colorPrimary: colors.mainOrange,
		borderRadius: 10,
	},
}
