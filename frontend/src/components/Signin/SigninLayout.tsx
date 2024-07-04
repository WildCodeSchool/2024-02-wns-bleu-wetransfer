import { FC } from "react";
import styled from "@emotion/styled";
import Signin from "../../assets/Signin.png";

const SigninLayout: FC = () => {
	return (
		<SignInLayout>
			<TitleSignIn>He!</TitleSignIn>
			<img src={Signin} alt="" />
		</SignInLayout>
	);
};

const SignInLayout = styled.div`
	background: white;
	width: 80%;
	height: 80%;
	border-radius: 20px;
	margin: 0 auto;
`;

const TitleSignIn = styled.h1`
	color: black;
`;

export default SigninLayout;
