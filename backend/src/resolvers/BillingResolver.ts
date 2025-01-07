import {Billing} from "../entities/billing";
import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {Context} from "../index";
import {User} from "../entities/user";
import {Plan} from "../entities/plan";

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
		} catch (error) {
			console.error("Error fetching user billing:", error);
			throw new Error("Unable to fetch billing information.");
		}
	}

	@Mutation(() => String)
	async handleUserBilling(
		@Arg("planId") planId: number,
		@Arg("unsubscribe", {nullable: true}) unsubscribe: boolean,
		// @Ctx() context: Context
	) {
		try {
			const billing = await handleUserBilling(53, planId, unsubscribe);
			return billing;
		} catch (error) {
			console.error("Error handling user billing:", error);
			throw new Error("Unable to handle billing information." + error);
		}
	}
}

export const handleUserBilling = async (userId: number, planId: number, unsubscribe = false) => {
	try {
		const user = await User.findOneByOrFail({id: userId});
		const plan = await Plan.findOneByOrFail({
			id: planId,
		});

		console.log("user >>>", user);
		console.log("plan >>>", plan);

		if (unsubscribe) {

			const currentBilling = await Billing.findOne({
			relations: ["user", "plan"], 
			where: {
				user: { id: userId },
				plan: { id: planId },
			},
			});

			console.log("current billing >>>", currentBilling);
			if (!currentBilling) {
				throw new Error("Billing not found");
			}

			currentBilling.end_subscription_date = new Date();
			await currentBilling.save();
			return "Billing removed";
		}

		const billing = new Billing();
		billing.user = user;
		billing.plan = plan;
		billing.last_payment_date = new Date();
		
		await billing.save();
		return billing;
	} catch (error) {
		throw new Error("Internal server error" + error);
	}
}

export default BillingResolver;
