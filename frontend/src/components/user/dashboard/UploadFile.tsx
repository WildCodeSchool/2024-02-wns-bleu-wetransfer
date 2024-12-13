import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";
import axios from "axios";
import { UploadFile as AntdUploadFile, UploadProps } from "antd/es/upload";
import { useQuery } from "@apollo/client";
import { GET_CONNECTED_USER } from "../../../graphql/queries";

const { Dragger } = Upload;

const UploadFile: React.FC = () => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [fileList, setFileList] = useState<AntdUploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useQuery(GET_CONNECTED_USER);

  const handleAddEmail = () => {
    if (receiverEmail && !emails.includes(receiverEmail)) {
      setEmails([...emails, receiverEmail]);
      setReceiverEmail("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddEmail();
    }
  };

  const handleBeforeUpload = (file: AntdUploadFile) => {
    if (file.type && file.size) {
      const isSupportedType = [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ].includes(file.type);
      const isFileSizeValid = file.size / 1024 / 1024 < 2;

      if (!isSupportedType) {
        message.error(`${file.name} is not a supported file type.`);
        return Upload.LIST_IGNORE;
      }

      if (!isFileSizeValid) {
        message.error(
          `${file.name} is too large. File size must be less than 2MB.`
        );
        return Upload.LIST_IGNORE;
      }

      return false;
    }
  };

  const handleChange = (info: { fileList: AntdUploadFile[] }) => {
    setFileList(info.fileList);
  };

  const handleUpload = async () => {
    if (emails.length === 0) {
      message.error("Please add at least one receiver email.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("files", file.originFileObj);
      }
    });

    formData.append("receiversEmails", emails.join(","));
    formData.append("senderEmail", data.getConnectedUser.email);

    try {
      const response = await axios.post(
        "http://localhost:7002/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
      setIsLoading(false);
      message.success("Files uploaded successfully.");
      setFileList([]);
      setEmails([]);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      message.error("Error uploading files.");
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: handleBeforeUpload,
    onChange: handleChange,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ContentWrapper>
      <StyledDragger {...props} style={{ background: "#E8DEF8" }}>
        <DraggerContent>
          <PlusOutlined
            style={{
              fontSize: "32px",
              marginRight: "8px",
              color: "#6B6B6B",
            }}
          />
          <DragText>
            <DraggerTitle>Drag & Drop your file here</DraggerTitle>
            <DraggerText>or Select a folder</DraggerText>
          </DragText>
        </DraggerContent>
      </StyledDragger>
      <BottomSection>
        <EmailSection>
          <Input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter email"
          />
          <EmailList>
            {emails.map((email, index) => (
              <EmailItem key={index}>{email}</EmailItem>
            ))}
          </EmailList>
        </EmailSection>
        <Button
          style={{ background: "#65558F", color: "white" }}
          icon={<PlusOutlined />}
          onClick={handleAddEmail}
        >
          Add Email
        </Button>
      </BottomSection>
      <TransferButton
        type="primary"
        size="large"
        loading={isLoading}
        disabled={emails.length === 0}
        onClick={handleUpload}
      >
        Transfer Files
      </TransferButton>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  background: white;
  width: 60%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 8px;
`;

const StyledDragger = styled(Dragger)`
  width: 80%;
  padding: 20px;
  margin-bottom: 20px;
`;

const DraggerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const DraggerTitle = styled.h3`
  margin-bottom: 10px;
  color: #7b7b7b;
`;

const DraggerText = styled.p`
  color: #6b6b6b;
`;

const DragText = styled.div`
  text-align: left;
  margin-left: 10px;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const EmailList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 120px;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const EmailItem = styled.li`
  padding: 5px;
  border-bottom: 1px solid #ccc;
`;

const TransferButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background: #0a0025;
`;

export default UploadFile;
