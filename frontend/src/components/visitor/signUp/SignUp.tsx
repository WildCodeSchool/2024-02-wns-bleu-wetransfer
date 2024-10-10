import { FC } from "react";
import { Input, Form, Button, Checkbox, notification } from "antd";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { SIGN_UP_USER } from "../../../graphql/mutations";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type NotificationType = "success" | "info" | "warning" | "error";

const SignUp: FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

	const openNotificationWithIcon = (
		type: NotificationType,
		message: string,
		title: string
	) => {
		api[type]({
			message: title,
			description: message,
		});
	};

	const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
		onCompleted(data) {
			openNotificationWithIcon(
				"success",
				"You have successfully signed up!",
				"Success"
			);
		},
		onError(error) {
			openNotificationWithIcon("error", error.message, "Error");
		},
	});

	const handleSignUp = async (values: any) => {
		try {
			await signUpUser({
				variables: {
					firstname: values.firstname,
					lastname: values.lastname,
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
				},
			});
		} catch (e) {
			openNotificationWithIcon("error", e.message, "Error");
		}
	};

	return (
		<InputWrapper>
			{contextHolder}
			<Title>Oh, hello there!</Title>
			<StyledForm
				name="control-hooks"
				onFinish={handleSignUp}
				{...formItemLayout}
			>
				<Form.Item
					name="firstname"
					rules={[
						{
							required: true,
							message: "Please enter your first name",
						},
					]}
					labelCol={{ span: 24 }}
				>
					<StyledInput allowClear placeholder="First name" />
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="lastname"
					rules={[
						{
							required: true,
							message: "Please enter your last name",
						},
					]}
				>
					<StyledInput allowClear placeholder="Last name" />
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="email"
					rules={[
						{
							required: true,
							type: "email",
							message: "Please enter a valid email",
						},
					]}
				>
					<StyledInput allowClear placeholder="Email address" />
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="password"
					rules={[
						{
							required: true,
							message: "Please enter your password",
						},
					]}
				>
					<StyledPasswordInput
						data-testid="password"
						allowClear
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: "Please confirm your password",
						},
					]}
				>
					<StyledPasswordInput
						data-testid="confirmPassword"
						allowClear
						placeholder="Confirm password"
					/>
				</Form.Item>
				<Form.Item
					name="conditions"
					valuePropName="checked"
					rules={[
						{
							required: true,
							message: "You must accept the conditions",
						},
					]}
				>
					<StyledCheckbox>
						<Checkbox data-testid="conditions">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Pellentesque ornare, velit ullamcorper rhoncus
							scelerisque
						</Checkbox>
					</StyledCheckbox>
				</Form.Item>
				<Form.Item>
					<StyledButton
						data-testid="registerButton"
						type="primary"
						htmlType="submit"
						loading={loading}
					>
						Sign up
					</StyledButton>
				</Form.Item>
			</StyledForm>
			<SignInText>
				Already a member?{" "}
				<Link to="/access/login">
					<SignInLink>Sign in now</SignInLink>
				</Link>
			</SignInText>
		</InputWrapper>
	);
};

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
	},
	wrapperCol: {
		sm: { span: 24 },
	},
};

const InputWrapper = styled.div`
	width: 20rem;
	padding: 2rem;
	text-align: center;
	@media (max-width: 768px) {
		width: 75%;
	}
	@media (max-width: 550px) {
		width: 90%;
	}
`;

const Title = styled.h2`
	font-size: 1.8rem;
	margin-bottom: 1.5rem;
`;

const StyledForm = styled(Form)`
	.ant-form-item {
		margin-bottom: 0.5rem; /* Ajustez la valeur selon vos besoins */
	}
`;

const StyledInput = styled(Input)`
	&.ant-input-affix-wrapper {
		border-radius: 8px;
		margin: 0.5rem 0;
	}
`;

const StyledPasswordInput = styled(Input.Password)`
	&.ant-input-password {
		border-radius: 8px;
		margin: 0.5rem 0;
	}
`;

const StyledButton = styled(Button)`
	width: 100%;
	border-radius: 8px;
	background-color: orange;
	border: none;
`;

const SignInText = styled.p`
	margin-top: 1rem;
`;

const SignInLink = styled.a`
	color: #4a90e2;
`;

const StyledCheckbox = styled.div`
	display: flex;
	align-items: flex-start;
	margin-top: 1rem;
	margin-bottom: 1rem;
	text-align: justify;
`;

export default SignUp;
