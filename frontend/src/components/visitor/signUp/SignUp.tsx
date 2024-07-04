import {FC} from "react";
import { Input, Form, Button, Checkbox } from 'antd';
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { SIGN_UP_USER } from "../../../graphql/mutations";

const SignUp: FC = () => {
    const handleSignUp = async (value: any) => {
        console.log(value)
        const result = await signUpUser({
            variables: {
              data: value,
            },
          });
    }

    const [signUpUser] = useMutation(SIGN_UP_USER, {
        onCompleted(data) {
          console.log("mutation completed data", data);
        },
        onError(error) {
          console.log("error after executing mutation", error);
        },
      });

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