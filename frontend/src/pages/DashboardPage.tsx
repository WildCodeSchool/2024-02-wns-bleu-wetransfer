import React from "react";
import styled from "@emotion/styled";
import UploadFile from "../components/user/dashboard/UploadFile";

const Dashboard: React.FC = () => {
	return (
		<DashboardWrapper>
			<UploadFile />
		</DashboardWrapper>
	);
};

const DashboardWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Dashboard;