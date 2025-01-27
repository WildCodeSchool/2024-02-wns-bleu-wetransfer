import React from "react";
import { colors } from "../../_colors.ts";
import { Button, Form, Input, notification } from "antd";
import { LOGIN_MUTATION } from "../../graphql/mutations.ts";
import { useNavigate } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const { Item } = Form;

const SignInForm: React.FC = () => {
	const [notifApi, contextHolder] = notification.useNotification();
	const navigate = useNavigate();

	const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
		onCompleted: () => {
			navigate("/dashboard");
		},
		onError: (error: ApolloError) => {
			notifApi.error(error);
			console.error("Login error", error);
		},
	});

	const handleRecoverPassword = () => {};

	const handleLogin = (values: { email: any; password: any }): void => {
		login({
			variables: {
				email: values.email,
				password: values.password,
			},
		});
	};

	return (
		<FormContainer>
			{contextHolder}
			<TitleContainer>
				<Title>Hello again !</Title>
				<SubTitle>Welcome back, you've been missed !</SubTitle>
			</TitleContainer>
			<Form name="login" layout="vertical" onFinish={handleLogin}>
				<Item
					name="email"
					rules={[
						{ required: true, message: "Email is missing !" },
						{ type: "email", message: "Wrong email format" },
					]}
				>
					<Input placeholder="email" allowClear />
				</Item>
				<Item
					name="password"
					rules={[
						{ required: true, message: "Password is missing !" },
					]}
				>
					<Input.Password placeholder="password" allowClear />
				</Item>
				<Button
					type="link"
					onClick={handleRecoverPassword}
					style={{ paddingLeft: 0, color: "grey", fontSize: 12 }}
				>
					Recover Password
				</Button>
				<Item>
					<Button
						style={{
							width: "100%",
							borderRadius: 30,
						}}
						htmlType="submit"
						type="primary"
						disabled={loading}
					>
						Login
					</Button>
				</Item>
			</Form>
			<RegisterTitleContainer>
				<SubTitle>Not a member ?</SubTitle>
				<RegisterTitle>
					<Link to="/access/register">
						<SignInLink>Register now</SignInLink>
					</Link>
				</RegisterTitle>
			</RegisterTitleContainer>
		</FormContainer>
	);
};

const RegisterTitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}
`;

const SignInLink = styled.a`
	color: #4a90e2;
`;

const Title = styled.h2`
	font-size: 30px;
	font-weight: 500;
`;

const SubTitle = styled.p`
	font-size: 15px;
	font-weight: 400;
`;

const RegisterTitle = styled(SubTitle)`
	color: ${colors.lightPurple};
	font-weight: 500;
	text-decoration: underline;
	cursor: pointer;
	transition: 0.2s;

	&:hover {
		color: ${colors.mainOrange};
	}

	&:active {
		color: rgba(255, 149, 24, 0.49);
	}
`;

const PasswordRecover = styled.p`
	font-weight: 300;
	text-decoration: underline;
	font-size: 10px;
	color: rgba(87, 87, 87, 0.66);
	cursor: pointer;

	&:active {
		color: rgba(114, 114, 114, 0.6);
	}
`;

const TitleContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20px;
	gap: 5px;
`;

const FormContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default SignInForm;
