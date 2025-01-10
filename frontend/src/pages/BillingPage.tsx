import React from "react";
import styled from '@emotion/styled';
import {PricingTitle} from "./PricingPage.tsx";
import {Badge, Descriptions, message, Popconfirm, Spin} from 'antd';
import {GET_USER_BILLING} from "../graphql/queries.ts";
import {useMutation, useQuery} from '@apollo/client';
import PlanDisplay from "../components/billing/PlanDisplay.tsx";
import {colors} from "../_colors.ts";
import {HANDLE_USER_BILLING} from "../graphql/mutations.ts";

const {Item} = Descriptions;

const BillingPage: React.FC = () => {

	const [handleUserBilling, {userBillingLoading}] = useMutation(HANDLE_USER_BILLING, {
		onCompleted: () => {
			message.success("Plan updated")
			window.location.reload()
		}
	})

	const {data, loading, error} = useQuery(GET_USER_BILLING);

	if (loading) {
		return <Spin/>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<BillingPageWrapper>
			<PricingTitle>Billing</PricingTitle>
			<BillingInfoWrapper>
				{!data?.getUserBilling ?
					<p>An error occured</p>
					:
					<>
						<Descriptions title='Billing Information'
						              style={{background: 'whitesmoke', padding: 20, borderRadius: 12, width: 900}}>
							<Item label='Subscription Status'>
								{!data?.getUserBilling.end_subscription_date ?
									<Badge status='success' text="Active"/>
									:
									<Badge status='error' text="Disabled"/>
								}
							</Item>
							<Item label="Your plan">
								{data?.getUserBilling?.plan?.name.toUpperCase()}
							</Item>
							<Item label="Price">
								{data?.getUserBilling?.plan?.price > 0 ? `${data?.getUserBilling?.plan?.price}€ / month` : "Free"}
							</Item>
							<Item
								label='Subscribed from'>{new Date(data?.getUserBilling.subscription_date).toLocaleDateString()}</Item>
							<Item
								label='Next payment'>{new Date(data?.getUserBilling.next_payment_date).toLocaleDateString()}
							</Item>
							{
								data?.getUserBilling?.plan?.price > 0 &&
                                <Item>
                                    <Popconfirm title="Are you sure to unsubscribe now?"
                                                description="You'll lose your access immediately"
                                                okText="Unsubscribe"
                                                onConfirm={() => handleUserBilling({
										            variables: {
											            planId: 1, unsubscribe: false
										            }
									            })}
                                    >
                                        <a style={{color: colors.mainOrange}}>Unsubscribe now</a>
                                    </Popconfirm>
                                </Item>
							}
						</Descriptions>
					</>
				}
			</BillingInfoWrapper>
			<PricingTitle>Upgrade your Plan</PricingTitle>
			<PlanDisplay
				planId={data?.getUserBilling?.plan?.id}/>

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
