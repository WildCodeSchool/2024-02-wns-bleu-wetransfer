import styled from "@emotion/styled";
import { Button, Card, Table, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";
import { GET_FILES_FROM_UPLOAD } from "../graphql/mutations";

const VisitorDownloadPage = () => {
  const [notifApi, contextHolder] = notification.useNotification();
  const [searchParams] = useSearchParams();

  console.log(searchParams.get("token"));

  const [token, { loading, error }] = useMutation(GET_FILES_FROM_UPLOAD, {
    onError: (error: ApolloError) => {
      notifApi.error(error);
      console.error("Error while getting file", error);
    },
  });

  const files = [
    {
      key: "1",
      name: "mon-super-fichier.txt",
      size: "10mo",
      sent: "2 hours ago",
      action: "Preview",
    },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      render: (text: string) => (
        <span>
          <FileIcon /> {text}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "",
      dataIndex: "sent",
      key: "sent",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text: string) => <PreviewLink>{text}</PreviewLink>,
    },
  ];

  return (
    <VisitorDownloadWrapper>
      <Card
        style={{ width: 650, borderRadius: "10px", padding: "25px" }}
        title={
          <TitleContainer>
            <TextContainer>
              <h3>Hello there!</h3>
              <p>It seems that you've received a file from Matthieu!</p>
            </TextContainer>
            <ExpirationText>This link expires in 3 days</ExpirationText>
          </TitleContainer>
        }
      >
        <Table
          columns={columns}
          dataSource={files}
          pagination={false}
          showHeader={false}
          bordered={false}
          style={{ marginBottom: "20px" }}
        />
        <ButtonContainer>
          <Button type="primary" icon={<DownloadOutlined />}>
            Download all
          </Button>
        </ButtonContainer>
      </Card>
    </VisitorDownloadWrapper>
  );
};

const FileIcon = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ddd;
  margin-right: 10px;
  border-radius: 4px;
`;

const PreviewLink = styled.a`
  color: #7f58ff;
  text-decoration: underline;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  line-height: 1.4;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #555;
  }
`;

const ExpirationText = styled.span`
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const VisitorDownloadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export default VisitorDownloadPage;
