import { Billing } from "../entities/billing";
import { Query, Resolver } from "type-graphql";

@Resolver(Billing)
class BillingResolver {
  @Query(() => [Billing])
  async getAllBilling() {
    return await Billing.find();
  }
}

export default BillingResolver;
