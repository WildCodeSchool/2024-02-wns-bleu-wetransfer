import React from "react";
import styled from "@emotion/styled";
import { GET_USER_FILES } from "../../../graphql/queries";
import { useQuery } from "@apollo/client";

const UserFiles: React.FC = () => {
    const { data, loading, error } = useQuery(GET_USER_FILES, {
        variables: {
            userId: "3",
        },
    });

    console.log(data);

    return (
        <ContentWrapper>
            <h1>Files</h1>
            {loading && <p>Loading...</p>}
            {data &&
                data.getUserFiles.map((file: any) => (
                    <div key={file.id}>
                        <h3>{file.name}</h3>
                        <p>{file.size} mo</p>
                    </div>
                ))}
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
