import {FC} from "react";
import styled from "@emotion/styled";
import {Button, ConfigProvider, Form, Input, message} from "antd";
import {GET_CONNECTED_USER} from "../graphql/queries.ts";
import {useQuery} from "@apollo/client";


const SettingsPage: FC = () => {
	const [form] = Form.useForm()


	useQuery(GET_CONNECTED_USER, {
		onCompleted: (data) => {
			const {firstname, lastname, email} = data.getConnectedUser

			form.setFieldsValue({
				firstname,
				lastname,
				email
			})
		},
		onError: (err) => {
			message.error(err.message)
		}
	})

	const handleSubmitForm = (values) => {
		const {firstname, lastname, password} = values

	}

	return (
		<SettingsPageWrapper>
			<Form
				onFinish={handleSubmitForm}
				form={form}
				name="settings"
			>
				<Form.Item
					name="firstname"
					rules={[
						{
							required: true,
							message: "Please enter your first name",
						},
					]}
					labelCol={{span: 24}}
				>
					<StyledInput allowClear placeholder="First name"/>
				</Form.Item>
				<Form.Item
					labelCol={{span: 24}}
					name="lastname"
					rules={[
						{
							required: true,
							message: "Please enter your last name",
						},
					]}
				>
					<StyledInput allowClear placeholder="Last name"/>
				</Form.Item>
				<ConfigProvider theme={{
					token: {colorBgContainerDisabled: "grey"}
				}}>

					<Form.Item
						labelCol={{span: 24}}
						name="email"

					>
						<StyledInput allowClear placeholder="Email" disabled/>
					</Form.Item>
				</ConfigProvider>
				<Form.Item
					labelCol={{span: 24}}
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
					labelCol={{span: 24}}
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
				<Form.Item>
					<StyledButton
						data-testid="submitButton"
						type="primary"
						htmlType="submit"
					>
						Sign up
					</StyledButton>
				</Form.Item>
			</Form>
		</SettingsPageWrapper>
	)
}

const SettingsPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const StyledInput = styled(Input)`
    &.ant-input-affix-wrapper {
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

const StyledPasswordInput = styled(Input.Password)`
    &.ant-input-password {
        border-radius: 8px;
        margin: 0.5rem 0;
    }
`;

export default SettingsPage