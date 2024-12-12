import styled from "@emotion/styled";
import { Button, Card, Modal, notification, Table, Checkbox } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ApolloError, useMutation } from "@apollo/client";
import { GET_FILES_FROM_UPLOAD } from "../graphql/mutations";
import { useEffect, useState } from "react";
import axios from "axios";

interface FileData {
	key: string;
	name: string;
	size: string;
	sent: string;
	action: string;
	default_name: string;
	created_at: string;
	url: string;
}

const VisitorDownloadPage = () => {
	const [notifApi, contextHolder] = notification.useNotification();
	const [searchParams] = useSearchParams();
	const [files, setFiles] = useState<FileData[]>([]);
	const [filePreview, setFilePreview] = useState<any>(null);
	const [selectedFiles, setSelectedFiles] = useState<FileData[]>([]);
	const [selectAll, setSelectAll] = useState(false);

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
					(file: FileData, index: number) => ({
						...file,
						url: `http://localhost:7002/access/download?token=${token}&fileId=${file.id}`,
						key: index,
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
		const now = new Date();
		const targetDate = new Date(date);
		const diffMs = now.getTime() - targetDate.getTime();

		if (diffMs < 0) {
			return "Sent just now";
		}

		const diffSeconds = Math.floor(diffMs / 1000);
		const diffMinutes = Math.floor(diffSeconds / 60);
		const diffHours = Math.floor(diffMinutes / 60);
		const diffDays = Math.floor(diffHours / 24);

		let result = "Sent ";

		if (diffDays > 0) {
			result += `${diffDays} day${diffDays > 1 ? "s" : ""}`;
			if (diffHours % 24 > 0) {
				result += ` and ${diffHours % 24} hour${
					diffHours % 24 > 1 ? "s" : ""
				}`;
			}
		} else if (diffHours > 0) {
			result += `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
			if (diffMinutes % 60 > 0) {
				result += ` and ${diffMinutes % 60} minute${
					diffMinutes % 60 > 1 ? "s" : ""
				}`;
			}
		} else if (diffMinutes > 0) {
			result += `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
		} else {
			result += "just now";
			return result;
		}

		return result + " ago";
	};

	const handlePreviewFile = async (fileDefaultName: string) => {
		try {
			const response = await axios.get(
				`http://localhost:7002/files/get-one?fileDefaultName=${fileDefaultName}`,
				{ responseType: "blob" }
			);

			const fileUrl = URL.createObjectURL(response.data);
			setFilePreview(fileUrl);
		} catch (err) {
			console.error("Error fetching file for preview:", err);
		}
	};

	const formatSizeInMB = (sizeInBytes: string) => {
		const size = parseInt(sizeInBytes, 10);
		if (isNaN(size)) return "N/A";
		return (size / (1024 * 1024)).toFixed(2) + " MB";
	};

	const handleSelectAll = (checked: boolean) => {
		setSelectAll(checked);
		setSelectedFiles(checked ? files : []);
	};

	const handleSelectFile = (file: FileData, checked: boolean) => {
		if (checked) {
			setSelectedFiles((prev) => [...prev, file]);
		} else {
			setSelectedFiles((prev) => prev.filter((f) => f.key !== file.key));
		}
	};

	const downloadSelectedFiles = async () => {
		try {
			const response = await axios.post(
				"http://localhost:7002/files/download",
				{ files: selectedFiles.map((file) => file.default_name) },
				{ responseType: "blob" }
			);

			const blob = new Blob([response.data], { type: "application/zip" });

			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = "selected_files.zip";
			link.click();

			URL.revokeObjectURL(link.href);
		} catch (e) {
			console.error("Error downloading files:", e);
		}
	};

	const columns = [
		{
			title: (
				<Checkbox
					onChange={(e) => handleSelectAll(e.target.checked)}
					checked={selectAll}
				/>
			),
			dataIndex: "checkbox",
			key: "checkbox",
			render: (_: any, file: FileData) => (
				<Checkbox
					onChange={(e) => handleSelectFile(file, e.target.checked)}
					checked={selectedFiles.some((f) => f.key === file.key)}
				/>
			),
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
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
			render: (_: any, file: FileData) => (
				<PreviewLink
					onClick={() => handlePreviewFile(file.default_name)}
				>
					Preview
				</PreviewLink>
			),
		},
	];

	return (
		<VisitorDownloadWrapper>
			{contextHolder}
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
						onClick={downloadSelectedFiles}
						disabled={selectedFiles.length === 0}
					>
						Download
					</Button>
				</ButtonContainer>
			</Card>
			<Modal
				open={!!filePreview}
				onCancel={() => setFilePreview(null)}
				maskClosable={true}
				centered
				footer={
					<Button onClick={() => setFilePreview(null)} type="primary">
						Close
					</Button>
				}
			>
				<img
					src={filePreview}
					alt="Preview"
					style={{
						maxWidth: "100%",
						maxHeight: "80vh",
						objectFit: "contain",
						display: "block",
						margin: "0 auto",
					}}
				/>
			</Modal>
		</VisitorDownloadWrapper>
	);
};

// Styles
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

const PreviewLink = styled.a`
	color: #7f58ff;
	text-decoration: underline;
`;

export default VisitorDownloadPage;
