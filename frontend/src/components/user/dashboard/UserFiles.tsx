import React from "react";
import styled from "@emotion/styled";
import SharedFilesTable from "./upload files/SharedFilesTable.tsx";
import MyUploads from "./MyUploads.tsx";


const UserFiles: React.FC = () => {

	return (
		<>
			<TablesContainer>
				<MyUploads/>
			</TablesContainer>
			<SharedFilesTable/>
		</>
	);
};

export const TablesContainer = styled.div`
    background: white;
    border-radius: 6px;
    width: 100%;
    padding: 10px
`


export default UserFiles;
