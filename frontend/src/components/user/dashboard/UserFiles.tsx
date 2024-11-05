import React from "react";
import styled from "@emotion/styled";
// import { Space, Table, Tag } from 'antd';
// import type { TableProps } from 'antd';

const UserFiles: React.FC = () => {
    return (
        <ContentWrapper>
            {/* <Table columns={columns} dataSource={data} /> */}
        </ContentWrapper>
	);
};

const ContentWrapper = styled.div`
	background: white;
	width: 60%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	padding: 20px;
	border-radius: 8px;
`;

export default UserFiles;
