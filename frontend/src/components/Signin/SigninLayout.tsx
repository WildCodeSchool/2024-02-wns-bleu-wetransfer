import { FC } from "react";
import styled from "@emotion/styled";
import Signin from "../../assets/Signin.png";
import SignInForm from "./SignInForm.tsx";

const SigninLayout: FC = () => {
	return (
		<SignInLayout>
			<SignInForm />
			<StyledImage src={Signin} alt="" />
		</SignInLayout>
	);
};

const StyledImage = styled.img`
	flex: 1;
	width: 50%;
	height: auto;
	object-fit: cover;
	max-width: 100%;
	@media (max-width: 768px) {
		display: none;
	}
`;

const SignInLayout = styled.div`
	width: 100%;
	max-width: 750px;
	height: auto;
	border-radius: 20px;
	padding-top: 6px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	background: white;
	justify-content: center;
	align-items: center;
	@media (max-width: 768px) {
		width: 75%;
		padding-top: 25px;
		padding-bottom: 50px;
	}
`;

export default SigninLayout;
