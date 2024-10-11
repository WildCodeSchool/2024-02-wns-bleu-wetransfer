import {FC} from "react";
import {Modal, Typography} from "antd";

const {Paragraph} = Typography

interface FileUploadFinishedModalProps {
	open: boolean,
	onCancel: () => void,
	downloadLink: string
}


const FileUploadFinishedModal: FC<FileUploadFinishedModalProps> = ({open, onCancel, downloadLink}) => {

	return (
		<Modal open={open} onCancel={onCancel} title="File(s) uploaded successfully !" onOk={onCancel}>
			<Paragraph copyable>{downloadLink}</Paragraph>
		</Modal>
	)
}

export default FileUploadFinishedModal