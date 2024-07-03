import { Visitors } from "../entities/visitors";
import { Query, Resolver } from "type-graphql";

@Resolver(Visitors)
class VisitorsResolver {
  @Query(() => [Visitors])
  async getAllVisitors() {
    return await Visitors.find();
  }
}

export default VisitorsResolver;
