import React from "react";
import styled from "@emotion/styled";
import UploadFile from "../components/user/dashboard/UploadFile";
import MyUploads from "../components/user/dashboard/MyUploads.tsx";
import SharedFilesTable from "../components/user/dashboard/upload files/SharedFilesTable.tsx";

const Dashboard: React.FC = () => {
	return (
		<DashboardWrapper>
			<DashboardLayout>
				<UploadFile/>
				<MyUploads/>
				<SharedFilesTable/>
			</DashboardLayout>
		</DashboardWrapper>
	);
};

const DashboardLayout = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 40px;
`

const DashboardWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
`;

export default Dashboard;