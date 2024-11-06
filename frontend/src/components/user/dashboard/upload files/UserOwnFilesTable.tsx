import React, {FC} from "react";
import {Button, Select, Table} from "antd";
import {colors} from "../../../../_colors.ts";
import {ShareAltOutlined} from "@ant-design/icons";
import {useQuery} from "@apollo/client";
import {GET_USER_FILES} from "../../../../graphql/queries.ts";

const {Column} = Table

const UserOwnFilesTable: FC = () => {

	const {data, loading, error} = useQuery(GET_USER_FILES, {
		variables: {
			userId: 3,
		},
	});
	console.log(data?.getUserFiles)


	return (
		<Table dataSource={data?.getUserFiles} loading={loading} style={{width: '100%'}} rowSelection title={() => (
			<Button type='primary' icon={<ShareAltOutlined/>}>Share selected files</Button>
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
	)
}

export default UserOwnFilesTable