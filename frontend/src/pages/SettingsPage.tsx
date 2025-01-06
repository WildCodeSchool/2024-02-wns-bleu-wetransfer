import {FC} from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { Input, Form, Button, Image, Upload } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

const SettingsPage: FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
        uid: '-5',
        name: 'image.png',
        status: 'error',
        },
    ]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

	return (
        // 				onFinish={handleSignUp}
				// {...formItemLayout}
		<SettingsPageWrapper>
            <>
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                    />
                )}
            </>
            <SettingForm
				name="control-hooks"
			>
				<Form.Item
					name="firstname"
					rules={[
						{
							required: true,
							message: "Please enter your first name",
						},
					]}
					labelCol={{ span: 24 }}
				>
					<StyledInput allowClear placeholder="First name" />
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="lastname"
					rules={[
						{
							required: true,
							message: "Please enter your last name",
						},
					]}
				>
					<StyledInput allowClear placeholder="Last name" />
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="password"
					rules={[
						{
							required: true,
							message: "Please enter your password",
						},
					]}
				>
					<StyledPasswordInput
						data-testid="password"
						allowClear
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item
					labelCol={{ span: 24 }}
					name="confirmPassword"
					rules={[
						{
							required: true,
							message: "Please confirm your password",
						},
					]}
				>
					<StyledPasswordInput
						data-testid="confirmPassword"
						allowClear
						placeholder="Confirm password"
					/>
				</Form.Item>
				<Form.Item>
					<StyledButton
						data-testid="submitButton"
						type="primary"
						htmlType="submit"
						loading={false}
					>
						Sign up
					</StyledButton>
				</Form.Item>
            </SettingForm>
        </SettingsPageWrapper>
	)
}

const SettingsPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const SettingForm = styled.form`
    width: 40rem;
    padding: 2rem;
    max-width: 120rem;
    border-radius: 10px;
    background: #f9f9f9;
`

const StyledInput = styled(Input)`
	&.ant-input-affix-wrapper {
		border-radius: 8px;
		margin: 0.5rem 0;
	}
`;

const StyledButton = styled(Button)`
	width: 100%;
	border-radius: 8px;
	background-color: orange;
	border: none;
`;

const StyledPasswordInput = styled(Input.Password)`
	&.ant-input-password {
		border-radius: 8px;
		margin: 0.5rem 0;
	}
`;

export default SettingsPage