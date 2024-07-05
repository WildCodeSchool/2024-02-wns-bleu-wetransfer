/** @jsxImportSource @emotion/react */
import {css, Global} from "@emotion/react";
import styled from "@emotion/styled";

export const GlobalStyles = () => (
	<Global
		styles={css`
            @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

            body {
                background: #0A0025;
                font-family: "Roboto", sans-serif;
            }

            * {
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }

            html {
                scroll-behavior: smooth;
            }

            /* Webkit Browsers (Chrome, Safari, etc.) */

            ::-webkit-scrollbar {
                width: 8px;
            }

            ::-webkit-scrollbar-thumb {
                background: white;
                border-radius: 5px;
            }

            ::-webkit-scrollbar-track {
                background: transparent;
            }
		`}
	/>
);

export const Container = styled.main`
    max-width: 1440px;
    width: 100%;
    padding: 0 10px;
    height: fit-content;
    margin: 0 auto;
`


