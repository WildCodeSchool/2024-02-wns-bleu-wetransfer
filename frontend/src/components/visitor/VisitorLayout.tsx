import {FC} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {colors} from "../../_colors.ts";
import VisitorHeader from "./layout/VisitorHeader.tsx";

const VisitorLayout: FC = () => {
	const navigate = useNavigate()

	return (
		<LayoutContainer>
			<HeaderContainer>
				<WildTransferLogo onClick={() => navigate('/')}>WildTransfer</WildTransferLogo>
				<VisitorHeader/>
			</HeaderContainer>
			<Outlet/>
		</LayoutContainer>
	);
};

export const WildTransferLogo = styled.h1`
    color: ${colors.white};
    font-weight: 500;
    font-size: 30px;
    cursor: pointer;
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
