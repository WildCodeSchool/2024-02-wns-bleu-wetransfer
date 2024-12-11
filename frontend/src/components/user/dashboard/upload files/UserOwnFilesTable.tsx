import React, {FC, useState} from "react";
import {Button, Form, Input, message, Modal, Result, Select, Table} from "antd";
import {EditOutlined, MailOutlined, SaveOutlined, ShareAltOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_FILES} from "../../../../graphql/queries.ts";
import {
	ADD_FILES_ACCESS_USERS,
	CHANGE_PRIVACY_STATUS,
	DELETE_FILE,
	EDIT_FILE_NAME
} from "../../../../graphql/mutations.ts";

const {Column} = Table

const UserOwnFilesTable: FC = () => {
	const [form] = Form.useForm()

	const [selectedFiles, setSelectedFiles] = useState<OwnTableDatasource[] | []>([])
	const [openShareModal, setOpenShareModal] = useState<boolean>(false)
	const [shareSuccess, setShareSuccess] = useState<boolean>(false)
	const [editableRow, setEditableRow] = useState<number | null>(null)

	const {data, loading, error} = useQuery(GET_USER_FILES);

	const [addFilesAccessUsers, {addFilesloading}] = useMutation(ADD_FILES_ACCESS_USERS, {
		onCompleted(data) {
			console.log(data)
			setShareSuccess(true)
		}, onError(err) {
			message.error(err.toString(), 3)
		}
	})

	const [changeFileStatus] = useMutation(CHANGE_PRIVACY_STATUS, {
		onError(err) {
			message.error(err.toString(), 3)
		}
	})

	const [deleteFile] = useMutation(DELETE_FILE, {
		onError(err) {
			message.error(err.toString(), 3)
		}
	})

	const [editFileName] = useMutation(EDIT_FILE_NAME, {
		onError(err) {
			message.error(err.toString(), 3)
		}
	})

	const handleShareFiles = async (values): Promise<void> => {
		const filesToArray = selectedFiles.map(file => file.id)

		console.log(values.usersToShareTo)

		await addFilesAccessUsers({
			variables: {
				usersToShareTo: values.usersToShareTo,
				filesId: filesToArray
			}
		})
	}

	const handleChangeStatus = async (fileId, status) => {
		await changeFileStatus({
			variables: {
				id: fileId,
				status
			},
			refetchQueries: [{query: GET_USER_FILES}]
		})
	}

	const handleDeleteFile = async (fileId) => {
		await deleteFile({
			variables: {
				deleteFileId: fileId
			},
			refetchQueries: [{query: GET_USER_FILES}]
		})
	}

	const handleSaveFilename = async (fileId, newName) => {
		await editFileName({
			variables: {
				newName,
				editFileNameId: fileId
			},
			refetchQueries: [{query: GET_USER_FILES}]
		})
	}


	return (
		<>
			<Table dataSource={data?.getUserFiles}
			       loading={loading}
			       style={{width: '100%'}}
			       rowSelection={{
				       onSelect: (_record, _selected, selectedRows: OwnTableDatasource[]) => setSelectedFiles(selectedRows),
				       hideSelectAll: true
			       }}
			       title={() => (
				       <Button type='primary'
				               disabled={selectedFiles.length === 0}
				               icon={<ShareAltOutlined/>}
				               onClick={() => setOpenShareModal(true)}
				       >Share selected files
				       </Button>
			       )}>
				<Column key='name' title='Name' dataIndex='name' render={(text, file) => {
					if (editableRow === file.key) {
						return (
							<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
								<Input
									defaultValue={text}
									onPressEnter={(e) => handleSaveFilename(file.id, (e.target as HTMLInputElement).value)}
									onBlur={(e) => handleSaveFilename(file.id, (e.target as HTMLInputElement).value)}
								/>
								<Button type="text" onClick={() => setEditableRow(null)}>
									<SaveOutlined/>
								</Button>
							</div>
						);
					}

					return (
						<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
							{text}
							<Button type="text" onClick={() => setEditableRow(file.key)}>
								<EditOutlined/>
							</Button>
						</div>
					);
				}}/>
				<Column key='extension' title='Extension' dataIndex='type'/>
				<Column key='size' title='Size' dataIndex='size'/>
				<Column key='shared' title='Shared with'/>
				<Column key='privacy' title='Privacy' dataIndex='privacy_status' render={(text, file) => (
					<Select
						style={{width: 100}}
						defaultValue={text}
						options={[
							{
								label: 'Public',
								value: 'public'
							},
							{
								label: 'Private',
								value: 'private'
							}
						]}
						onChange={(value) => handleChangeStatus(file.id, value)}
					/>
				)}/>


				<Column key='actions' title='Quick Actions' width={170} render={(file) => (
					<Button
						type='text'
						style={{color: 'red'}}
						onClick={() => handleDeleteFile(file.id)}>Delete</Button>
				)}/>
			</Table>
			<Modal open={openShareModal}
			       onCancel={() => setOpenShareModal(false)}
			       onOk={() => form.submit()}
			       title='Share files'
			       loading={addFilesloading}
			>

				{shareSuccess ?
					<Result status='success'/>
					:
					<>
						<Table dataSource={selectedFiles}
						       pagination={false}
						       rowHoverable={false}
						       style={{marginBottom: 50}}
						>
							<Column key='name' dataIndex='name' title='Name'/>
							<Column key='extension' dataIndex='type' title='Extension'/>
						</Table>
						<Form form={form} layout='vertical' onFinish={handleShareFiles}>
							<Form.Item name='usersToShareTo' label='Add users to share with'
							           rules={[{required: true, message: "Add at least one user"}]}
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
							</Form.Item>
						</Form>
					</>

				}
			</Modal>
		</>
	)
}

export default UserOwnFilesTable