import React, { useState } from "react";
import styled from "@emotion/styled";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps, Button } from "antd";

const { Dragger } = Upload;

const Dashboard: React.FC = () => {
	const [email, setEmail] = useState("");
	const [emails, setEmails] = useState<string[]>([]);

	const handleAddEmail = () => {
		if (email && !emails.includes(email)) {
			setEmails([...emails, email]);
			setEmail("");
		}
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleAddEmail();
		}
	};

	const props: UploadProps = {
		name: "file",
		multiple: true,
		action: "/upload.do", // Change to your upload URL
		onChange(info) {
			const { status } = info.file;
			if (status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (status === "done") {
				console.log(`${info.file.name} file uploaded successfully.`);
			} else if (status === "error") {
				console.log(`${info.file.name} file upload failed.`);
			}
		},
	};

	return (
		<DashboardWrapper>
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
							<DraggerTitle>
								Drag & Drop your file here
							</DraggerTitle>
							<DraggerText>or Select a folder</DraggerText>
						</DragText>
					</DraggerContent>
				</StyledDragger>
				<BottomSection>
					<EmailSection>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Enter email"
						/>
						<EmailList>
							{emails.map((email, index) => (
								<EmailItem key={index}>{email}</EmailItem>
							))}
						</EmailList>
					</EmailSection>
					<Upload {...props}>
						<Button
							style={{ background: "#65558F", color: "white" }}
							icon={<PlusOutlined />}
						>
							Add File
						</Button>
					</Upload>
				</BottomSection>
			</ContentWrapper>
		</DashboardWrapper>
	);
};

const DashboardWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

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
	justify-content: center; /* Align horizontally */
	text-align: center; /* Align text */
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

export default Dashboard;
