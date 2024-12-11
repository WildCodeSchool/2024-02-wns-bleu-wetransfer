import React from "react";
import styled from "@emotion/styled";
import UploadFile from "../components/user/dashboard/UploadFile";
import UserFiles from "../components/user/dashboard/UserFiles";

const Dashboard: React.FC = () => {
	return (
		<DashboardWrapper>
			<DashboardLayout>
				<UploadFile/>
				<UserFiles/>
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