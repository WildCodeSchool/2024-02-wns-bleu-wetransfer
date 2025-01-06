import {Billing} from "../entities/billing";
import {Ctx, Query, Resolver} from "type-graphql";
import {Context} from "../index";

@Resolver(Billing)
class BillingResolver {
	@Query(() => [Billing])
	async getAllBilling() {
		return await Billing.find();
	}

	@Query(() => Billing, {nullable: true})
	async getUserBilling(@Ctx() context: Context): Promise<Billing | null> {

		try {
			const billing: Billing | null = await Billing.findOne({
				where: {user: {id: context.id}},
				relations: ['plan'],
			});

			if (billing) {
				return billing;
			} else {
				return null;
			}
			return null
		} catch (error) {
			console.error("Error fetching user billing:", error);
			throw new Error("Unable to fetch billing information.");
		}
	}
}

export default BillingResolver;
