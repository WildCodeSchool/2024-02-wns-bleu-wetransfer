import { Plans } from "../entities/plans";
import { Query, Resolver } from "type-graphql";

@Resolver(Plans)
class PlansResolver {
  @Query(() => [Plans])
  async getAllPlans() {
    return await Plans.find();
  }
}

export default PlansResolver;
