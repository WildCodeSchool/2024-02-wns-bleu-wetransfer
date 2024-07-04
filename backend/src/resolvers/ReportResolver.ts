import { Report } from "../entities/report";
import { Query, Resolver } from "type-graphql";

@Resolver(Report)
class ReportResolver {
  @Query(() => [Report])
  async getAllReport() {
    return await Report.find();
  }
}

export default ReportResolver;
