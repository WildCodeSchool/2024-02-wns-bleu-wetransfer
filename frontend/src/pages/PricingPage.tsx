import styled from "@emotion/styled";
import {Button, Card} from 'antd'

const {Meta} = Card

interface CardContent {
	title: string,
	description: string
	price: number,
	suggested: boolean
}

const PricingPage = () => {

	const cardsContent: CardContent[] = [
		{title: 'Free', description: 'Il faut décrire le plan', price: 0, suggested: false},
		{title: 'Premium', description: 'Encore une description', price: 10, suggested: true},
		{title: 'Ultimate', description: 'Description du plan Ultimate', price: 1424, suggested: false}
	]

	return (
		<PricingPageWrapper>
			<PricingTitle>Pricing</PricingTitle>
			<CardsContainer>
				{cardsContent.map((plan) => (
					<Card
						style={{
							width: 300,
							border: plan.suggested ? '5px solid rgba(231,166,26,1)' : 'none'
						}}
						actions={[
							<Button type='primary'>Subscribe</Button>
						]}
						title={
							<CardTitle>{plan.title}</CardTitle>
						}
						extra={`$${plan.price}/month`}
					>
						<Meta
							title='In this plan :'
							description={plan.description}
							style={{height: 250}}
						/>
					</Card>
				))}
			</CardsContainer>
		</PricingPageWrapper>
	)
}

const CardTitle = styled.h3`
    font-size: 27px;
`

const CardsContainer = styled.div`
    width: 80%;
    height: 500px;
    display: flex;
    justify-content: space-around;
    gap: 20px;
    align-items: center;
`

const PricingTitle = styled.h3`
    font-size: 30px;
    color: white;
`

const PricingPageWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
`

export default PricingPage