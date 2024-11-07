import React from "react";
import styled from "@emotion/styled";
import UploadFile from "../components/user/dashboard/UploadFile";
import UserFiles from "../components/user/dashboard/UserFiles";

const Dashboard: React.FC = () => {
	return (
		<DashboardWrapper>
			<UploadFile />
			<UserFiles />
		</DashboardWrapper>
	);
};

const DashboardWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default Dashboard;