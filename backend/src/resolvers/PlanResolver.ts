import {Plan} from "../entities/plan";
import {Query, Resolver} from "type-graphql";
import { redisClient } from "../index";

@Resolver(Plan)
class PlanResolver {
	@Query(() => [Plan])
	async getAllPlans() {
		const cacheResult = await redisClient.get('allPlans');

		if (cacheResult) {
			return JSON.parse(cacheResult);
		}

		const plans = await Plan.find();
		await redisClient.set('allPlans', JSON.stringify(plans), { EX: 120 });

		return plans;
	}
}

export default PlanResolver;
