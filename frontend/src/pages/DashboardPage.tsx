import {FC} from "react";
import styled from "@emotion/styled";

const Dashboard: FC = () => {
	return (
		<DashboardWrapper>Dashboard</DashboardWrapper>
	)
}

const DashboardWrapper = styled.div`
    background: #cc9c24;
    width: 100%;
    height: 100vh;
`

export default Dashboard