import React from "react";
import styled from '@emotion/styled'
import {PricingTitle} from "./PricingPage.tsx";
import {Badge, Button, Card, Descriptions, Popconfirm} from 'antd'

const {Item} = Descriptions
const {Meta} = Card

const BillingPage: React.FC = () => {

	return (
		<BillingPageWrapper>
			<PricingTitle>Billing</PricingTitle>
			<BillingInfoWrapper>
				<Card style={{
					width: 300
				}}
				      actions={[
					      <Popconfirm title="Are you sure to unsubscribe now ?"
					                  description="You'll lose your access immediately"
					                  okText="Unsubscribe"
					      >
						      <Button>Unsubscribe now</Button>
					      </Popconfirm>
				      ]}
				      title='plan Ultimate'
				>
					<Meta
						title='In this plan :'
						description="description du plan"
						style={{height: 250}}
					/>
				</Card>
				<Descriptions title='Billing Informations'
				              style={{background: 'whitesmoke', padding: 20, borderRadius: 12, width: 900}}>
					<Item label='Subscription Status'><Badge status='success' text="Running"/></Item>
					<Item label='Subscribed from'>20/10/2019</Item>
					<Item label='Next payment'>10/378/1010</Item>
					<Item><Button type='primary'>Upgrade Plan</Button></Item>
				</Descriptions>
			</BillingInfoWrapper>
		</BillingPageWrapper>
	)
}

const BillingInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 30px
`

const BillingPageWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 30px
`

export default BillingPage