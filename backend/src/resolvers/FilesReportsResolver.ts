import { FilesReports } from "../entities/filesReports";
import { Query, Resolver } from "type-graphql";

@Resolver(FilesReports)
class FilesReportsResolver {
  @Query(() => [FilesReports])
  async getAllFilesReports() {
    return await FilesReports.find();
  }
}

export default FilesReportsResolver;
