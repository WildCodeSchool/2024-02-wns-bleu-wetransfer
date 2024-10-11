import {Visitor} from "../entities/visitor";
import {Query, Resolver} from "type-graphql";

@Resolver(Visitor)
class VisitorResolver {
	@Query(() => [Visitor])
	async getAllVisitor() {
		return await Visitor.find();
	}
}

export default VisitorResolver;
