import {FC} from "react";
import styled from "@emotion/styled";
import {Button} from "antd";

const SignUpButtons: FC = () => {
	return (
		<SignUpButtonsWrapper>
			<Button style={{borderRadius: 15}} type='primary'>Sign Up</Button>
			<Button style={{borderRadius: 15, background: 'none', color: 'white'}}>Sign In</Button>
		</SignUpButtonsWrapper>
	)
}

const SignUpButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 100%;
`

export default SignUpButtons