import styled from "@emotion/styled/macro";
import React from "react";

const App: React.FC = () => {
	return <Appwrapper>Hello</Appwrapper>;
};

const Appwrapper = styled.p`
	color: red;
`;

export default App;
