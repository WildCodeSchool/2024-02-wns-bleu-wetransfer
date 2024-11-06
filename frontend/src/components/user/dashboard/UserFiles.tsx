import React from "react";
import {Tabs} from "antd";
import styled from "@emotion/styled";
import UserOwnFilesTable from "./upload files/UserOwnFilesTable.tsx";
import SharedFilesTable from "./upload files/SharedFilesTable.tsx";


const UserFiles: React.FC = () => {

	return (
		<TablesContainer>
			<Tabs
				type='card'
				centered
				items={[
					{
						key: 'myfiles',
						label: "My Files",
						children: <UserOwnFilesTable/>
					},
					{
						key: 'shared',
						label: "Shared with me",
						children: <SharedFilesTable/>
					}
				]}
			/>
		</TablesContainer>
	);
};

const TablesContainer = styled.div`
    background: white;
    border-radius: 6px;
    width: 100%;
    padding: 10px
`


export default UserFiles;
