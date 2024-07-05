import { FC } from "react";
import { Input, Form, Button, Checkbox, message } from 'antd';
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { SIGN_UP_USER } from "../../../graphql/mutations";

const SignUp: FC = () => {
  const [signUpUser, { loading }] = useMutation(SIGN_UP_USER, {
    onCompleted(data) {
      message.success("Sign up successful!");
    },
    onError(error) {
      message.error(`${error.message}`);
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
          confirmPassword: values.confirmPassword
        },
      });
    } catch (e) {
      message.error(`Sign up failed`);
    }
  };

  return (
    <InputWrapper>
      <Title>Oh, hello there!</Title>
      <StyledForm name="control-hooks" onFinish={handleSignUp} {...formItemLayout}>
        <Form.Item name="firstname" label="First name" rules={[{ required: true, message: "Please enter your first name" }]} labelCol={{ span: 24 }}>
          <StyledInput allowClear placeholder="First name" />
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} name="lastname" label="Last name" rules={[{ required: true, message: "Please enter your last name" }]}>
          <StyledInput allowClear placeholder="Last name" />
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} name="email" label="Email address" rules={[{ required: true, type: 'email', message: "Please enter a valid email" }]}>
          <StyledInput allowClear placeholder="Email address" />
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
          <StyledPasswordInput allowClear placeholder="Password" />
        </Form.Item>
        <Form.Item labelCol={{ span: 24 }} name="confirmPassword" label="Confirm password" rules={[{ required: true, message: "Please confirm your password" }]}>
          <StyledPasswordInput allowClear placeholder="Confirm password" />
        </Form.Item>
        <Form.Item name="conditions" valuePropName="checked" rules={[{ required: true, message: "You must accept the conditions" }]}>
          <StyledCheckbox>
            <Checkbox />
            <ConditionsText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare, velit ullamcorper rhoncus scelerisque</ConditionsText>
          </StyledCheckbox>
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit" loading={loading}>
            Sign up
          </StyledButton>
        </Form.Item>
      </StyledForm>
      <SignInText>Already a member? <SignInLink>Sign in now</SignInLink></SignInText>
    </InputWrapper>
  );
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 24 },
  }
};

const InputWrapper = styled.div`
  width: 20rem;
  padding: 2rem;
  text-align: center;
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
  }
`;

const StyledPasswordInput = styled(Input.Password)`
  &.ant-input-password {
    border-radius: 8px;
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
  color: #4A90E2;
`;

const StyledCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ConditionsText = styled.span`
  font-size: 0.8rem;
  text-align: justify;
  margin-left: 0.5rem;
`;

export default SignUp;
