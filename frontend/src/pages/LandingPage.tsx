import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Select, Upload} from 'antd';
import {InboxOutlined, MailOutlined} from '@ant-design/icons';
import axios from 'axios';
import styled from '@emotion/styled';

const {Dragger} = Upload;
const {Item} = Form;
const {TextArea} = Input;


const LandingPage: React.FC = () => {
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();

	const handleBeforeUpload = (file) => {
		// Validate the file type and size before uploading
		const isSupportedType = ["image/jpeg", "image/png", "application/pdf"].includes(file.type);
		const isFileSizeValid = file.size / 1024 / 1024 < 2;

		if (!isSupportedType) {
			message.error(`${file.name} is not a supported file type.`);
			return Upload.LIST_IGNORE;
		}

		if (!isFileSizeValid) {
			message.error(`${file.name} is too large. File size must be less than 2MB.`);
			return Upload.LIST_IGNORE;
		}

		return false;
	};

	const handleUpload = async (values) => {
		console.log(values)
		const formData = new FormData();
		fileList.forEach((file) => {
			formData.append('files', file.originFileObj);
		});

		// Append form data
		formData.append('senderEmail', values.senderEmail);
		formData.append('receiversEmails', values.receiversEmails.join(','));
		formData.append('title', values.title);
		formData.append('message', values.message);

		try {
			console.log(formData)
			const response = await axios.post('http://localhost:3000/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					console.log(percent); // You can update the UI to show the progress
				},
			});
			message.success("Files uploaded successfully");
			console.log(response.data); // Handle the response data if needed
		} catch (error) {
			console.error('Error uploading file:', error);
			message.error("Error uploading files");
		}
	};

	const handleChange = (info) => {
		// Filter out the files that do not pass the validation
		const newFileList = info.fileList.filter((file) => file.status !== 'error');
		setFileList(newFileList);
	};


	return (
		<LandingPageWrapper>
			<FormContainer background="#65558F">
				<UploadTitle>Send file casually</UploadTitle>
				<StyledDivider/>
				<Form form={form} name="visitorSendFilesForm" onFinish={handleUpload}>
					<Item name="files" rules={[{required: true, message: "Files missing"}]}>
						<Dragger
							name="file"
							multiple
							beforeUpload={handleBeforeUpload} // Validate files before adding to the list
							onChange={handleChange}
							fileList={fileList}
							style={{background: "rgba(255,255,255,0.26)"}}
						>
							<p className="ant-upload-drag-icon">
								<InboxOutlined/>
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
							<p className="ant-upload-hint">Upload max size : 2 MB</p>
						</Dragger>
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
    background: ${({background}) => background ? background : "#7b5c8a"};
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
