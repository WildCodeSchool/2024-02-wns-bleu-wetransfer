import { FC } from "react";
import { Outlet } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "../../_colors.ts";
import VisitorHeader from "./layout/VisitorHeader.tsx";

const VisitorLayout: FC = () => {
	return (
		<LayoutContainer>
			<HeaderContainer>
				<WildTransferLogo>WildTransfer</WildTransferLogo>
				<VisitorHeader />
			</HeaderContainer>
			<Outlet />
		</LayoutContainer>
	);
};

export const WildTransferLogo = styled.h1`
	color: ${colors.white};
	font-weight: 500;
	font-size: 30px;
`;

export const HeaderContainer = styled.div`
	height: 70px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 40px 0 40px;
	margin-top: 30px;
`;

const LayoutContainer = styled.div`
	height: auto;
	width: 100%;
`;

export default VisitorLayout;
