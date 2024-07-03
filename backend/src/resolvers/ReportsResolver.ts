import { Reports } from "../entities/reports";
import { Query, Resolver } from "type-graphql";

@Resolver(Reports)
class ReportsResolver {
  @Query(() => [Reports])
  async getAllReports() {
    return await Reports.find();
  }
}

export default ReportsResolver;
