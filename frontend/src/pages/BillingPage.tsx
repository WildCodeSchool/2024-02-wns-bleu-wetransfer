import React from "react";
import styled from '@emotion/styled';
import {PricingTitle} from "./PricingPage.tsx";
import {Badge, Button, Card, Descriptions, Popconfirm} from 'antd';
import {GET_USER_BILLING} from "../graphql/queries.ts";
import {useQuery} from '@apollo/client';

const {Item} = Descriptions;
const {Meta} = Card;

const BillingPage: React.FC = () => {
	const {data, loading, error} = useQuery(GET_USER_BILLING);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (!data || !data.getUserBilling) {
		return <p>No billing information available.</p>;
	}

	const billingInfo = data.getUserBilling;

	return (
		<BillingPageWrapper>
			<PricingTitle>Billing</PricingTitle>
			<BillingInfoWrapper>
				<Card style={{width: 300}}
				      actions={[
					      <Popconfirm title="Are you sure to unsubscribe now?"
					                  description="You'll lose your access immediately"
					                  okText="Unsubscribe"
					      >
						      <Button>Unsubscribe now</Button>
					      </Popconfirm>
				      ]}
				      title={billingInfo.plan.name.toUpperCase()}
				>
					<Meta
						title='In this plan:'
						description={billingInfo.plan.description}
						style={{height: 250}}
					/>
				</Card>
				<Descriptions title='Billing Information'
				              style={{background: 'whitesmoke', padding: 20, borderRadius: 12, width: 900}}>
					<Item label='Subscription Status'>
						{!billingInfo.end_subscription_date ?
							<Badge status='success' text="Active"/>
							:
							<Badge status='error' text="Disabled"/>
						}
					</Item>
					<Item label='Subscribed from'>{billingInfo.subscription_date}</Item>
					<Item label='Next payment'>{billingInfo.next_payment_date}</Item>
					<Item><Button type='primary'>Upgrade Plan</Button></Item>
				</Descriptions>
			</BillingInfoWrapper>
		</BillingPageWrapper>
	);
};

const BillingInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 30px
`;

const BillingPageWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 30px
`;

export default BillingPage;
