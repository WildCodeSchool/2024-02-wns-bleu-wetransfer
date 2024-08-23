import {FC} from "react";
import styled from "@emotion/styled";
import {colors} from "../../../_colors.ts";
import {DollarOutlined, UploadOutlined} from "@ant-design/icons";
import {useNavigate} from 'react-router-dom'

const TransferPricing: FC = () => {
	const navigate = useNavigate()

	return (
		<TransferPricingWrapper>
			<ButtonContainer>
				<UploadOutlined
					style={{
						fontSize: 22,
						background: colors.transparentPurple,
						width: 50,
						padding: 3,
						display: 'flex',
						justifyContent: 'center',
						borderRadius: 20
					}}/>
				<ButtonName>Transfer File</ButtonName>
			</ButtonContainer>
			<ButtonContainer onClick={() => navigate('/access/pricing')}>
				<DollarOutlined style={{fontSize: 22}}/>
				<ButtonName>Pricing</ButtonName>
			</ButtonContainer>
		</TransferPricingWrapper>
	)
}

const ButtonName = styled.p`
    color: ${colors.black};
    font-weight: 300;
    font-size: 13px;
    transition: font-weight .2s;
`;

const ButtonContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 85px;
    border-radius: 20px;
    padding: 5px;
    cursor: pointer;

    &:hover ${ButtonName} {
        font-weight: 700;
        transition: .2s;
    }
`;

const TransferPricingWrapper = styled.div`
    background: ${colors.white};
    border-radius: 20px;
    height: 100%;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    gap: 5px;
`
export default TransferPricing