import React, {FC, useState} from "react";
import {Button, Table} from "antd";
import {useQuery} from "@apollo/client";
import {GET_USER_SHARED_FILES} from "../../../../graphql/queries.ts";
import {DownloadOutlined} from "@ant-design/icons";
import {colors} from "../../../../_colors.ts";
import {TablesContainer} from "../UserFiles.tsx";

const {Column} = Table

const SharedFilesTable: FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<OwnTableDatasource[] | []>([])

	const {data, loading, error} = useQuery(GET_USER_SHARED_FILES);

	const handleRowSelection = (e): void => {
		console.log(e)
	}

	return (
		<TablesContainer>
			<Table dataSource={data?.getUserAccessSharedFiles}
			       loading={loading}
			       style={{width: '100%'}}
			       rowSelection={{
				       onSelect: (_record, _selected, selectedRows: OwnTableDatasource[]) => setSelectedFiles(selectedRows)
			       }}
			       title={() => (
				       <Button type='primary' icon={<DownloadOutlined/>}>Download selected files</Button>
			       )}>
				<Column key='name' title='Name' dataIndex='name'/>
				<Column key='extension' title='Extension' dataIndex='type'/>
				<Column key='size' title='Size' dataIndex='size'/>
				<Column key='actions' title='Quick Actions' width={200} render={() => (
					<>
						<Button disabled={!selectedFiles} type='text'
						        style={{color: colors.lightPurple}}>Preview</Button>
						<Button type='text' style={{color: 'red'}}>Remove</Button>
					</>
				)}/>
			</Table>
		</TablesContainer>
	)
}


export default SharedFilesTable