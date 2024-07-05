import { FC } from "react";
import styled from "@emotion/styled";
import Signin from "../../assets/Signin.png";
import SignUp from "../visitor/signUp/SignUp";

const SignupLayout: FC = () => {
	return (
		<SignUpLayout>
			<FormSign><SignUp/></FormSign>
			<StyledImage src={Signin} alt="" />
		</SignUpLayout>
	);
};

const FormSign = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	color: black;
`;

const StyledImage = styled.img`
	flex: 1;
	width: 100%;
	margin-left: 0.2rem;
	height: auto;
`;

const SignUpLayout = styled.div`
	width: 850px;
	height: auto;
	border-radius: 20px;
	padding-top: 6px;
	margin: 0 auto;
	display: flex;
	flex-direction: row-reverse;
	background: white;
`;

export default SignupLayout;
