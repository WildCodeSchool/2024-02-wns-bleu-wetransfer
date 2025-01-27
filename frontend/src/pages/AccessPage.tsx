import { FC } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import SigninLayout from "../components/Signin/SigninLayout";
import SignupLayout from "../components/Signup/SignupLayout";

const AccessPage: FC = () => {
	const location = useLocation();

	return (	
		<AccessPageWrapper>
			{location.pathname === "/access/login" && <SigninLayout />}
			{location.pathname === "/access/register" && <SignupLayout />}
		</AccessPageWrapper>
	);
};

const AccessPageWrapper = styled.div`
	background: #0a0025;
	width: 100%;
	height: 80vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default AccessPage;
