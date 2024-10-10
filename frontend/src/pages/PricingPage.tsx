import styled from "@emotion/styled";
import { Button, Card } from "antd";

const { Meta } = Card;

interface CardContent {
	title: string;
	description: string;
	price: number;
	suggested: boolean;
}

const PricingPage = () => {
	const cardsContent: CardContent[] = [
		{
			title: "Free",
			description: "Il faut décrire le plan",
			price: 0,
			suggested: false,
		},
		{
			title: "Premium",
			description: "Encore une description",
			price: 10,
			suggested: true,
		},
		{
			title: "Ultimate",
			description: "Description du plan Ultimate",
			price: 1424,
			suggested: false,
		},
	];

	return (
		<PricingPageWrapper>
			<PricingTitle>Pricing</PricingTitle>
			<CardsContainer>
				{cardsContent.map((plan, index) => (
					<Card
						key={index}
						style={{
							width: 300,
							border: plan.suggested
								? "5px solid rgba(231,166,26,1)"
								: "none",
						}}
						actions={[<Button type="primary">Subscribe</Button>]}
						title={<CardTitle>{plan.title}</CardTitle>}
						extra={`$${plan.price}/month`}
					>
						<Meta
							title="In this plan :"
							description={plan.description}
							style={{ height: 250 }}
						/>
					</Card>
				))}
			</CardsContainer>
		</PricingPageWrapper>
	);
};

const CardTitle = styled.h3`
	font-size: 27px;
`;

const CardsContainer = styled.div`
	width: 80%;
	height: 500px;
	display: flex;
	justify-content: space-evenly;
	gap: 20px;
	align-items: center;
	@media (max-width: 768px) {
		/* Active le défilement horizontal en mobile */
		width: 100%;
		overflow-x: auto;
		display: flex;
		flex-wrap: nowrap; /* Pas de retour à la ligne, tout en une seule ligne */
		scroll-snap-type: x mandatory; /* Un scroll fluide d'une carte à l'autre */
		padding-bottom: 20px;

		/* Masque les barres de défilement selon le navigateur */
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari */
		}

		/* Applique une taille réduite pour les cartes */
		& > .ant-card {
			flex: 0 0 auto;
			width: 80%; /* Les cartes prendront 80% de l'écran */
			scroll-snap-align: start; /* Aligne les cartes au début lors du scroll */
			transform: scale(0.9); /* Réduit légèrement la taille des cartes */
		}
	}
`;

export const PricingTitle = styled.h3`
	font-size: 30px;
	color: white;
`;

const PricingPageWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 40px;
	@media (max-width: 768px) {
		width: 115%;
	}
`;

export default PricingPage;
