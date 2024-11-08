import styled from "@emotion/styled";
import { Button, Card, Table, notification } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";
import { GET_FILES_FROM_UPLOAD } from "../graphql/mutations";
import { useEffect, useState } from "react";

interface FileData {
	key: string;
	name: string;
	size: string;
	sent: string;
	action: string;
	created_at: string;
	url: string;
}

const VisitorDownloadPage = () => {
	const [notifApi, contextHolder] = notification.useNotification();
	const [searchParams] = useSearchParams();
	const [files, setFiles] = useState<FileData[]>([]);

	const token = searchParams.get("token");
	const [getFiles, { loading, error, data }] = useMutation(
		GET_FILES_FROM_UPLOAD,
		{
			onError: (error: ApolloError) => {
				notifApi.error({
					message: "Error while getting file",
					description: error.message,
				});
				console.error("Error while getting file", error);
			},
		}
	);

	useEffect(() => {
		if (token) {
			getFiles({ variables: { token } }).then((response) => {
				const fetchedFiles = response.data.getFilesFromUpload.map(
					(file: File, index: number) => ({
						key: index.toString(),
						name: file.name,
						size: file.size,
						created_at: file.created_at,
						sent: "Just now",
						action: "Preview",
						url: `http://localhost:7002/access/download?token=${token}&fileId=${file.id}`,
					})
				);
				setFiles(fetchedFiles);
			});
		} else {
			notifApi.error({
				message: "Token manquant",
				description: "Le token n'est pas présent dans l'URL.",
			});
		}
	}, [token, getFiles, notifApi]);

	const formatDate = (date: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(date).toLocaleDateString(undefined, options);
	};

	const formatSizeInMB = (sizeInBytes: string) => {
		const size = parseInt(sizeInBytes, 10);
		if (isNaN(size)) return "N/A";
		return (size / (1024 * 1024)).toFixed(2) + " MB";
	};

	const downloadAllFiles = () => {
		files.forEach((file) => {
			const link = document.createElement("a");
			link.href = file.url;
			link.download = file.name;
			link.click();
		});
	};

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (text: string) => (
				<span>
					<FileIcon /> {text}
				</span>
			),
		},
		{
			title: "Size",
			dataIndex: "size",
			key: "size",
			render: (size: string) => formatSizeInMB(size),
		},
		{
			title: "Date",
			dataIndex: "created_at",
			key: "created_at",
			render: (date: string) => formatDate(date),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (text: string) => <PreviewLink>{text}</PreviewLink>,
		},
	];

	return (
		<VisitorDownloadWrapper>
			<Card
				style={{ width: 800, borderRadius: "10px", padding: "25px" }}
				title={
					<TitleContainer>
						<TextContainer>
							<h3>Hello there!</h3>
							<p>It seems that you've received files!</p>
						</TextContainer>
						<ExpirationText>
							This link expires in 3 days
						</ExpirationText>
					</TitleContainer>
				}
			>
				<Table
					columns={columns}
					dataSource={files}
					pagination={false}
					showHeader={true}
					bordered={false}
					style={{ marginBottom: "20px" }}
				/>
				<ButtonContainer>
					<Button
						type="primary"
						icon={<DownloadOutlined />}
						onClick={downloadAllFiles}
					>
						Download all
					</Button>
				</ButtonContainer>
			</Card>
		</VisitorDownloadWrapper>
	);
};

// Styles pour les icônes et boutons
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
