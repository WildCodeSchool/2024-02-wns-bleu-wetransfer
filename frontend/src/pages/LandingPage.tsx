import React, { useState } from "react";
import {
	Button,
	Divider,
	Form,
	Input,
	message,
	Select,
	Upload,
	UploadFile,
} from "antd";
import { MailOutlined, PlusCircleFilled } from "@ant-design/icons";
import axios from "axios";
import styled from "@emotion/styled";
import { UploadChangeParam } from "antd/es/upload";
import SignInForm from "../components/Signin/SignInForm.tsx";
import { useNavigate } from "react-router-dom";
import { colors } from "../_colors.ts";
import FileUploadFinishedModal from "../components/visitor/FileUploadFinishedModal.tsx";

const { Dragger } = Upload;
const { Item } = Form;
const { TextArea } = Input;

interface FormValues {
	senderEmail: string;
	receiversEmails: string[];
	title: string;
	message: string;
}

const LandingPage: React.FC = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [downloadLink, setDownloadLink] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleBeforeUpload = (file: UploadFile) => {
		// Validate the file type and size before uploading
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

	const handleUpload = (values: FormValues) => {
		setIsLoading(true);
		console.log(values);
		const formData = new FormData();
		fileList.forEach((file) => {
			if (file.originFileObj) {
				formData.append("files", file.originFileObj);
			}
		});

		// Append form data
		formData.append("senderEmail", values.senderEmail);
		formData.append("receiversEmails", values.receiversEmails.join(","));
		formData.append("title", values.title);
		formData.append("message", values.message);

		console.log(formData);

		axios
			.post("http://localhost:7002/files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
				onUploadProgress: (progressEvent) => {
					if (progressEvent.total) {
						const percent = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						console.log(percent);
					}
				},
			},
		).then((res) => {
			console.log(res.data.data.createUpload)
			form.resetFields()
			fileList.length = 0
			setDownloadLink(res.data.data.createUpload)
			setOpenModal(true)
			message.success("Files uploaded successfully");
			setIsLoading(false)
		}).catch((err) => {
			setIsLoading(false)
			console.error(err)
			message.error("Error uploading files");
		})
	};

	const handleChange = (info: UploadChangeParam<UploadFile>) => {
		const newFileList = info.fileList.filter(
			(file) => file.status !== "error"
		);
		setFileList(newFileList);
	};

	return (
		<LandingPageWrapper>
			<Title>WildTransfer</Title>
			<CardsWrapper>
				<FormContainer background="#65558F">
					<UploadTitle>Send files casually</UploadTitle>
					<StyledDivider />
					<Form
						form={form}
						name="visitorSendFilesForm"
						onFinish={handleUpload}
					>
						<Item
							name="files"
							rules={[
								{ required: true, message: "Files missing" },
							]}
						>
							<Dragger
								name="file"
								multiple
								beforeUpload={handleBeforeUpload}
								onChange={handleChange}
								fileList={fileList}
								style={{
									background: "rgba(255,255,255,0.26)",
									height: 60,
								}}
							>
								<PlusCircleFilled
									style={{
										fontSize: 20,
										color: colors.white,
									}}
								/>
								<p className="ant-upload-text">
									Click or drag file to this area to upload
								</p>
								<p className="ant-upload-hint">
									Upload max size : 2 MB
								</p>
							</Dragger>
						</Item>
						<Item
							name="senderEmail"
							rules={[
								{
									required: true,
									message: "Please enter your email",
								},
							]}
						>
							<UploadInput placeholder="Your email" allowClear />
						</Item>
						<Item
							name="receiversEmails"
							rules={[
								{
									required: true,
									message:
										"Please enter receiver(s) email(s)",
								},
							]}
						>
							<Select
								mode="tags"
								style={{ width: "100%" }}
								tokenSeparators={[","]}
								placeholder="Receivers emails"
								defaultActiveFirstOption={false}
								suffixIcon={<MailOutlined />}
								open={false}
							/>
						</Item>
						<Divider style={{ background: "white" }} />
						<Item name="title">
							<UploadInput placeholder="Title" allowClear />
						</Item>
						<Item name="message">
							<UploadTextArea
								placeholder="Message"
								allowClear
								maxLength={100}
							/>
						</Item>
						<Item>
							<TransferButton
								type="primary"
								size="large"
								htmlType="submit"
								loading={isLoading}
							>
								Transfer Files
							</TransferButton>
						</Item>
					</Form>
				</FormContainer>
				<FormContainer background="#ffffff">
					<SignInForm />
				</FormContainer>
			</CardsWrapper>
			<SuggestionsWrapper>
				<SuggestionText>
					Unlock insane features by register for <strong>free</strong>{" "}
					!
				</SuggestionText>
				<Button
					style={{
						borderRadius: 15,
						color: "whitesmoke",
						background: "none",
					}}
					onClick={() => navigate("/access/pricing")}
				>
					See plans
				</Button>
				<Button
					type="primary"
					style={{ borderRadius: 15 }}
					onClick={() => navigate("/access/register")}
				>
					Sign Up Now !
				</Button>
			</SuggestionsWrapper>
			<FileUploadFinishedModal
				open={openModal}
				onCancel={() => setOpenModal(false)}
				downloadLink={downloadLink}
			/>
		</LandingPageWrapper>
	);
};

const SuggestionText = styled.p`
	color: whitesmoke;
	font-size: 20px;
	font-weight: 200;
	@media (max-width: 768px) {
		font-size: calc(10px + 2px + 0vmin);
	}
`;

const SuggestionsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const Title = styled.h1`
	font-size: 70px;
	color: whitesmoke;
	font-weight: 500;
	@media (max-width: 768px) {
		max-width: 80%;
		font-size: 3.5rem;
	}
`;

const CardsWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 50px;
	max-width: 100%;
	@media (max-width: 768px) {
		flex-direction: column-reverse;
	}
`;

const LandingPageWrapper = styled.div`
	background: #0a0025;
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	gap: 20px;
`;

const FormContainer = styled.div<{ background?: string }>`
	background: ${({ background }) => (background ? background : "#7b5c8a")};
	padding: 18px;
	border-radius: 20px;
	text-align: center;
	width: 500px;
	flex: 1 1 45%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 580px;
	box-sizing: border-box;
	@media (max-width: 768px) {
		width: 120%;
		height: 100%;
	}
	&:nth-of-type(2) {
		@media (max-width: 768px) {
			padding-top: 70px;
			padding-bottom: 90px;
		}
	}
`;

const UploadTitle = styled.h2`
	color: white;
`;

const StyledDivider = styled(Divider)`
	border-color: white;
	margin: 15px;
`;

const UploadInput = styled(Input)`
	width: 100%;
`;

const UploadTextArea = styled(TextArea)`
	width: 100%;
`;

const TransferButton = styled(Button)`
	width: 100%;
	margin-top: 16px;
	background: #0a0025;
`;

export default LandingPage;
