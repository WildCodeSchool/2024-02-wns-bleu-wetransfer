import React, {FC, useState} from "react";
import {Button, Form, message, Modal, Result, Select, Table} from "antd";
import {colors} from "../../../../_colors.ts";
import {MailOutlined, ShareAltOutlined} from "@ant-design/icons";
import {useMutation, useQuery} from "@apollo/client";
import {GET_USER_FILES} from "../../../../graphql/queries.ts";
import {ADD_FILES_ACCESS_USERS} from "../../../../graphql/mutations.ts";

const {Column} = Table

const UserOwnFilesTable: FC = () => {
	const [form] = Form.useForm()

	const [selectedFiles, setSelectedFiles] = useState<OwnTableDatasource[] | []>([])
	const [openShareModal, setOpenShareModal] = useState<boolean>(false)
	const [shareSuccess, setShareSuccess] = useState<boolean>(false)

	const {data, loading, error} = useQuery(GET_USER_FILES);

	console.log(error)

	const [addFilesAccessUsers, {addFilesloading}] = useMutation(ADD_FILES_ACCESS_USERS, {
		onCompleted(data) {
			console.log(data)
			setShareSuccess(true)
		}, onError(err) {
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

	console.log(data?.getUserFiles)

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
				<Column key='name' title='Name' dataIndex='name'/>
				<Column key='extension' title='Extension' dataIndex='type'/>
				<Column key='size' title='Size' dataIndex='size'/>
				<Column key='shared' title='Shared with'/>
				<Column key='privacy' title='Privacy' render={() => (
					<Select
						style={{width: 100}}
						defaultActiveFirstOption
						options={[
							{
								label: 'Public',
								value: 'public'
							},
							{
								label: 'Private',
								value: 'private'
							}
						]}/>
				)}/>
				<Column key='actions' title='Quick Actions' width={170} render={() => (
					<>
						<Button type='text' style={{color: colors.lightPurple}}>Edit</Button>
						<Button type='text' style={{color: 'red'}}>Delete</Button>
					</>
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