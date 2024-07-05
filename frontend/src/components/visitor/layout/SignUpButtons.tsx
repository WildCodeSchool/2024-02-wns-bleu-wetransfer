import {FC} from "react";
import styled from "@emotion/styled";
import {Button} from "antd";
import { Link } from "react-router-dom";

const SignUpButtons: FC = () => {
	return (
		<SignUpButtonsWrapper>
			<Link to="/access/register"><Button style={{borderRadius: 15}} type='primary'>Sign Up</Button></Link>
			<Link to="/access/login"><Button style={{borderRadius: 15, background: 'none', color: 'white'}}>Sign In</Button></Link>
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