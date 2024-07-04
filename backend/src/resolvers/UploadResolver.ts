import { Upload } from "../entities/upload";
import { Query, Resolver } from "type-graphql";

@Resolver(Upload)
class UploadResolver {
  @Query(() => [Upload])
  async getAllUpload() {
    return await Upload.find();
  }
}

export default UploadResolver;
