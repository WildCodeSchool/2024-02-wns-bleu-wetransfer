import {FC} from "react";
import styled from "@emotion/styled";
import SignUp from "../components/visitor/signUp/SignUp";


const LandingPage: FC = () => {

	return (
		<LandingPageWrapper>
			<SignUp/>
		</LandingPageWrapper>
	)
}

const LandingPageWrapper = styled.div`
    background: #c9c9c9;
    width: 100%;
    height: 100vh;
`

export default LandingPage