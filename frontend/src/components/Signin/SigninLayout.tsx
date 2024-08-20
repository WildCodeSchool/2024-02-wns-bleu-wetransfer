import {FC} from "react";
import styled from "@emotion/styled";
import Signin from "../../assets/Signin.png";
import {Button, Form, Input} from "antd";
import {colors} from "../../_colors.ts";
import {useMutation} from "@apollo/client";
import {LOGIN_MUTATION} from "../../graphql/mutations.ts";
import {useNavigate} from "react-router-dom";

const {Item} = Form
const SigninLayout: FC = () => {
	const navigate = useNavigate()
	const [login, {loading, error}] = useMutation(LOGIN_MUTATION, {
		onCompleted: () => {
			navigate("/dashboard");
		},
		onError: (error) => {
			console.error("Login error", error);
		}
	});


	const handleRecoverPassword = () => {

	}

	const handleLogin = (values) => {
		login({
			variables: {
				email: values.email,
				password: values.password
			}
		})
	}

	return (
		<SignInLayout>
			<FormContainer>
				<TitleContainer>
					<Title>Hello again !</Title>
					<SubTitle>Welcome back, you've been missed !</SubTitle>
				</TitleContainer>
				<Form name='login' layout="vertical" onFinish={handleLogin}>
					<Item name="email" rules={[{required: true, message: "Email is missing !"}]}>
						<Input placeholder="email" allowClear/>
					</Item>
					<Item name="password" rules={[{required: true, message: "Password is missing !"}]}>
						<Input.Password placeholder="password" allowClear/>
					</Item>
					<Button type="link" onClick={handleRecoverPassword}
					        style={{paddingLeft: 0, color: 'grey', fontSize: 12}}>
						Recover Password
					</Button>
					<Item>
						<Button style={{
							width: '100%', borderRadius: 30
						}} htmlType="submit" type='primary'>Login</Button>
					</Item>
				</Form>
				<RegisterTitleContainer>
					<SubTitle>Not a member ?</SubTitle>
					<RegisterTitle>Register now !</RegisterTitle>
				</RegisterTitleContainer>
			</FormContainer>
			<StyledImage src={Signin} alt=""/>
		</SignInLayout>
	);
};

const RegisterTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`

const Title = styled.h2`
    font-size: 30px;
    font-weight: 500;
`

const SubTitle = styled.p`
    font-size: 15px;
    font-weight: 400;
`

const RegisterTitle = styled(SubTitle)`
    color: ${colors.lightPurple};
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
    transition: .2s;

    &:hover {
        color: ${colors.mainOrange};
    }

    &:active {
        color: rgba(255, 149, 24, 0.49);
    }
`

const PasswordRecover = styled.p`
    font-weight: 300;
    text-decoration: underline;
    font-size: 10px;
    color: rgba(87, 87, 87, 0.66);
    cursor: pointer;

    &:active {
        color: rgba(114, 114, 114, 0.6);
    }
`

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    gap: 5px
`

const FormContainer = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

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
