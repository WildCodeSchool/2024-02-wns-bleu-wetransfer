import { FC } from "react";
import { Input, Form, Button, Checkbox, message } from 'antd';
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { SIGN_UP_USER } from "../../../graphql/mutations";

const SignUp: FC = () => {
  const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
    onCompleted(data) {
      console.log("Mutation completed data", data);
      message.success("Sign up successful!");
    },
    onError(error) {
      console.error("Error after executing mutation", error);
      message.error(`Sign up failed: ${error.message}`);
    },
  });

  const handleSignUp = async (values: any) => {
    try {
      console.log("Sending values:", values);
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
      console.error("Error in handleSignUp function", e);
    }
  };

  return (
    <InputWrapper>
      <Form name="control-hooks" onFinish={handleSignUp}>
        <Form.Item name="firstname" label="First name" rules={[{ required: true, message: "Please enter your first name" }]}>
          <Input allowClear placeholder="Matthieu" />
        </Form.Item>
        <Form.Item name="lastname" label="Last name" rules={[{ required: true, message: "Please enter your last name" }]}>
          <Input allowClear placeholder="Dupont" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: "Please enter a valid email" }]}>
          <Input allowClear placeholder="matthieu.dupont@email.com" />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
          <Input.Password allowClear placeholder="Password" />
        </Form.Item>
        <Form.Item name="confirmPassword" label="Confirm password" rules={[{ required: true, message: "Please confirm your password" }]}>
          <Input.Password allowClear placeholder="Password" />
        </Form.Item>
        <Form.Item name="conditions" valuePropName="checked" rules={[{ required: true, message: "You must accept the conditions" }]}>
          <Checkbox>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare, velit ullamcorper rhoncus scelerisque</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>Already a member? Sign in now</p>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 20rem;
`;

export default SignUp;
