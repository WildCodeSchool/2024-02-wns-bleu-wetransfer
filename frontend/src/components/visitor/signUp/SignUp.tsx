import {FC} from "react";
import { Input, Form, Button, Checkbox } from 'antd';
import styled from "@emotion/styled";

const SignUp: FC = () => {
    const handleSignUp = (value: any) => {
        console.log(value)
    }

	return (
            <InputWrapper>
                <Form name="control-hooks" onFinish={handleSignUp}>
                    <Form.Item name="firstname" label="First name" rules={[{ required: true }]}>
			            <Input allowClear placeholder="Matthieu" />
                    </Form.Item>
                    <Form.Item name="lastname" label="Last name" rules={[{ required: true }]}>
                        <Input allowClear placeholder="Dupont" />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input allowClear placeholder="matthieu.dupont@email.com" />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input.Password allowClear placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="confirmPassword" label="Confirm password" rules={[{ required: true }]}>
                        <Input.Password allowClear placeholder="Password" />
                    </Form.Item>
                    <Form.Item name="conditions" valuePropName="checked" noStyle rules={[{ required: true }]}>
                        <Checkbox>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare, velit ullamcorper rhoncus scelerisque</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <p>Already a member? Sign in now</p>
            </InputWrapper>
	)
}

const InputWrapper = styled.div`
    width: 20rem;
`

export default SignUp