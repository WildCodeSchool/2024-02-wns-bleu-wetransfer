import {FC} from "react";
import styled from "@emotion/styled";
import Signin from "../../assets/Signin.png";
import SignInForm from "./SignInForm.tsx";

const SigninLayout: FC = () => {


	return (
		<SignInLayout>
			<SignInForm/>
			<StyledImage src={Signin} alt=""/>
		</SignInLayout>
	);
};


const StyledImage = styled.img`
    flex: 1;
    width: 50%;
    height: auto;
    object-fit: cover;
`;

const SignInLayout = styled.div`
    width: 750px;
    height: 470px;
    border-radius: 20px;
    padding-top: 6px;
    margin: 0 auto;
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
`;

export default SigninLayout;
