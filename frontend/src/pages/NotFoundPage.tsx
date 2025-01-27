import {FC} from "react";
import styled from "@emotion/styled";

const NotFoundPage: FC = () => {
	return (
		<NotFoundTitle>
			Not found
		</NotFoundTitle>
	)
}

const NotFoundTitle = styled.h1`
    color: red;
`

export default NotFoundPage