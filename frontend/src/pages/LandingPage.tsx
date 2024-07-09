import {FC, useState} from "react";
import styled from "@emotion/styled";
import {Button, Divider, Form, Input, message, Modal, Select, Upload} from "antd";
import {InboxOutlined, MailOutlined} from "@ant-design/icons";
import axios from 'axios'

const {Dragger} = Upload;
const {Item} = Form;

const LandingPage: FC = () => {
	const [fileList, setFileList] = useState([]);
	const [totalFileSize, setTotalFileSize] = useState(0);
	const [form] = Form.useForm();
	const [openSuccessModal, setOpenSuccessModal] = useState(false)

	const formatBytes = (bits) => {
		if (bits === 0) return 0;
		const k = 1024;
		const dm = 2;
		const i = Math.floor(Math.log(bits) / Math.log(k));
		const formattedNumber = parseFloat((bits / Math.pow(k, i)).toFixed(dm));
		return formattedNumber
	};

	const validateFile = (file: File): boolean => {
		const isSupportedType = ["image/jpeg", "image/png", "application/pdf"].includes(file.type);
		const isFileSizeValid = file.size / 1024 / 1024 < 2;

		console.log(file)

		if (!isSupportedType) {
			message.error(`${file.name} is not a supported file type.`);
			return false;
		}

		if (!isFileSizeValid) {
			message.error(`${file.name} is too large. File size must be less than 2MB.`);
			return false;
		}


		console.log(totalFileSize)
		if (totalFileSize / 1024 / 1024 > 2) {
			message.error(`Total file size must be less than 2MB.`);
			return false;
		}

		return true;
	};

	const handleChange = (info: any) => {
		let newFileList = [...info.fileList];

		newFileList = newFileList.map((file) => {
			if (file.response) {
				file.url = file.response.url;
			}
			return file;
		});

		const newTotalFileSize = newFileList.reduce((acc, file) => acc + file.size, 0);
		setTotalFileSize(newTotalFileSize);
		setFileList(newFileList);
	};

	const handleSubmitFilesForm = (values: any) => {
		console.log(values);
		axios.post(`http://localhost:3000/upload`, {
			values
		}).then((res) => {
			message.info("Fichiers uploadés avec succès")

		}).catch(err => console.log(err))
	};

	const customUpload = async ({file, onProgress, onSuccess, onError}) => {
		const isValid = validateFile(file);
		if (!isValid) {
			onError(new Error("File validation failed"));
			return;
		}

		const uploadProgress = setInterval(() => {
			let percent = 0;
			if (file.status === "uploading") {
				percent += 10;
				if (percent < 100) {
					onProgress({percent});
				} else {
					clearInterval(uploadProgress);
					onSuccess("ok");
				}
			}
		}, 100);
	};

	return (
		<LandingPageWrapper>
			<FormContainer background="#65558F">
				<UploadTitle>Send file casually</UploadTitle>
				<StyledDivider/>
				<Form form={form} name="visitorSendFilesForm" onFinish={handleSubmitFilesForm}>
					<Item name="files" rules={[{required: true, message: "Files missing"}]}>
						<UploadDragger
							name="file"
							multiple={true}
							customRequest={customUpload}
							onChange={handleChange}
							fileList={fileList}
							style={{background: "rgba(255,255,255,0.26)"}}
						>
							<p className="ant-upload-drag-icon">
								<InboxOutlined/>
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">{formatBytes(totalFileSize)} / 2MB</p>
						</UploadDragger>
					</Item>
					<Item name="senderEmail" rules={[{required: true, message: "Please enter your email"}]}>
						<UploadInput placeholder="Your email" allowClear/>
					</Item>
					<Item
						name="receiversEmails"
						rules={[{required: true, message: "Please enter receiver(s) email(s)"}]}
					>
						<Select
							mode="tags"
							style={{width: "100%"}}
							tokenSeparators={[","]}
							placeholder="Receivers emails"
							defaultActiveFirstOption={false}
							suffixIcon={<MailOutlined/>}
							open={false}
						/>
					</Item>
					<Divider style={{background: "white"}}/>
					<Item name="title">
						<UploadInput placeholder="Title" allowClear/>
					</Item>
					<Item name="message">
						<UploadTextArea placeholder="Message" allowClear maxLength={100}/>
					</Item>
					<Item>
						<TransferButton type="primary" size="large" htmlType="submit">
							Transfer Files
						</TransferButton>
					</Item>
				</Form>
			</FormContainer>
			<FormContainer background="#ffffff"></FormContainer>
			<Modal title="Créez un compte" open={openSuccessModal}>
				<h1>Bonjour</h1>
			</Modal>
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
    background: ${({background}) => background ? background : '#7b5c8a'};
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
