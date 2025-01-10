import React, {FC, useState} from "react";
import {Button, Card} from "antd";
import {CardTitle} from "../../pages/PricingPage.tsx";
import styled from "@emotion/styled";
import {useQuery} from "@apollo/client";
import {GET_ALL_PLANS} from "../../graphql/queries.ts";
import SubscribeModal from "./SubscribeModal.tsx";
import {Plan} from "../../types/plan";

const {Meta} = Card;

const PlanDisplay: FC<{
	planId: string,
}> = ({planId}) => {
	const [openSubscribeModal, setOpenSubscribeModal] = useState<null | Plan>(null)
	const {data, loading, error} = useQuery(GET_ALL_PLANS)

	return (
		<CustomCarContainer>
			{data?.getAllPlans?.filter(plan => plan.id !== planId).map((plan, index) => (
				<Card
					key={index}
					style={{
						width: 250,
						height: 'fit-content',
						border: plan.is_suggested
							? "5px solid rgba(231,166,26,1)"
							: "2px solid lightGrey",
					}}
					actions={[<Button type="primary" onClick={() => setOpenSubscribeModal(plan)}>Subscribe</Button>]}
					title={<CardTitle>{plan.name.toUpperCase()}</CardTitle>}
					extra={`$${plan.price}/month`}
				>
					<Meta
						title="In this plan :"
						description={plan.description}
						style={{minHeight: 150}}
					/>
				</Card>
			))}
			<SubscribeModal plan={openSubscribeModal!} onCancel={() => setOpenSubscribeModal(null)}/>
		</CustomCarContainer>
	)
}

const CustomCarContainer = styled.div`
    height: 300px;
    width: fit-content;
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`

export default PlanDisplay