import { Plan } from "../entities/plan";
import { Query, Resolver } from "type-graphql";

@Resolver(Plan)
class PlanResolver {
  @Query(() => [Plan])
  async getAllPlan() {
    return await Plan.find();
  }
}

export default PlanResolver;
