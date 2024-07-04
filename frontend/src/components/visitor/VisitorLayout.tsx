import {FC} from "react";
import {Outlet} from "react-router-dom";
import styled from "@emotion/styled";

const VisitorLayout: FC = () => {
	return (
		<>
			<Navbar/>
			<Outlet/>
		</>
	)
}

const Navbar = styled.div`
    width: 100%;
    height: 70px;
    background: purple;
    position: relative;
    top: 0;
`

export default VisitorLayout