import styled from "@emotion/styled";
import {Button, Card, Spin} from "antd";
import {FC} from "react";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLANS} from "../graphql/queries.ts";
import {useNavigate} from "react-router-dom";

const {Meta} = Card;

const PricingPage: FC = () => {
	const navigate = useNavigate()

	const {data, loading, error} = useQuery(GET_ALL_PLANS)

	if (loading) return <Spin/>

	if (!data || !data.getAllPlans) return <p>Cannot load plans</p>

	if (error) console.error(error)

	return (
		<PricingPageWrapper>
			<PricingTitle>Pricing</PricingTitle>
			<CardsContainer>
				{data?.getAllPlans?.map((plan, index) => (
					<Card
						key={index}
						style={{
							width: 300,
							border: plan.is_suggested
								? "5px solid rgba(231,166,26,1)"
								: "none",
						}}
						actions={[<Button type="primary"
						                  onClick={() => navigate('/access/register')}>Subscribe</Button>]}
						title={<CardTitle>{plan.name.toUpperCase()}</CardTitle>}
						extra={`$${plan.price}/month`}
					>
						<Meta
							title="In this plan :"
							description={plan.description}
							style={{height: 250}}
						/>
					</Card>
				))}
			</CardsContainer>
		</PricingPageWrapper>
	);
};

export const CardTitle = styled.h3`
    font-size: 25px;
`;

const CardsContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 947px) {
        margin-top: 20px
    }
`;

export const PricingTitle = styled.h3`
    font-size: 30px;
    color: white;
`;

const PricingPageWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`;

export default PricingPage;
