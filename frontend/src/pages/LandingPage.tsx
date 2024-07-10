import { FC } from "react";
import styled from "@emotion/styled";
import { Input, Button, Upload, message, Divider, Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";

const { Dragger } = Upload;
const { Item } = Form;

const LandingPage: FC = () => {
  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info: UploadChangeParam<UploadFile<any>>) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <LandingPageWrapper>
      <FormContainer background="#65558F">
        <UploadTitle>Send file casually</UploadTitle>
        <StyledDivider />
        <UploadDragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Max size 2 Gb</p>
        </UploadDragger>
        <Form>
          <Item name="email">
            <UploadInput
              data-testid="email"
              placeholder="Your email"
              allowClear
            />
          </Item>
          <Item name="email-to">
            <UploadInput
              data-testid="emailTo"
              placeholder="Email to"
              allowClear
            />
          </Item>
          <Item name="title">
            <UploadInput data-testid="title" placeholder="Title" allowClear />
          </Item>
          <Item name="message">
            <UploadTextArea
              data-testid="message"
              placeholder="Message"
              allowClear
            />
          </Item>
          <Item>
            <TransferButton type="primary" size="large" htmlType="submit">
              Transfer
            </TransferButton>
          </Item>
        </Form>
      </FormContainer>
      <FormContainer background="#ffffff"></FormContainer>
    </LandingPageWrapper>
  );
};

const LandingPageWrapper = styled.div`
  background: #0a0025;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const FormContainer = styled.div<{ background?: string }>`
  background: ${(props) => props.background || "#7b5c8a"};
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UploadTitle = styled.h2`
  color: white;
`;

const StyledDivider = styled(Divider)`
  border-color: white;
`;

const UploadDragger = styled(Dragger)`
  margin-bottom: 16px;
  text-align: center;
`;

const UploadInput = styled(Input)`
  width: 100%;
`;

const UploadTextArea = styled(Input.TextArea)`
  width: 100%;
`;

const TransferButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background: #0a0025;
`;

export default LandingPage;
