import {FC} from "react";
import styled from "@emotion/styled";
import SignUpButtons from "./SignUpButtons.tsx";
import TransferPricing from "./TransferPricing.tsx";

const VisitorHeader: FC = () => {
	return (
		<VisitorHeaderWrapper>
			<TransferPricing/>
			<SignUpButtons/>
		</VisitorHeaderWrapper>
	)
}

const VisitorHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 30px;

	@media screen and (max-width: 768px) {
		display: flex;
		flex-direction: column-reverse;
		gap: 10px;
	}

	@media screen and (max-width: 465px) {
		margin-top: 30px;
	}
`

export default VisitorHeader