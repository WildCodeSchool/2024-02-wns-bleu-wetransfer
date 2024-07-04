import { FC } from "react";
import styled from "@emotion/styled";
import SigninLayout from "../components/Signin/SigninLayout";

const AccessPage: FC = () => {
	return (
		<AccessPageWrapper>
			<SigninLayout />
		</AccessPageWrapper>
	);
};

const AccessPageWrapper = styled.div`
	background: #0a0025;
	width: 100%;
	height: 100vh;
	align-content: center;
`;

export default AccessPage;
