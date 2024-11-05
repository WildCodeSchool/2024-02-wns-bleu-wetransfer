import {Visitor} from "../entities/visitor";
import {Query, Resolver} from "type-graphql";

@Resolver(Visitor)
class VisitorResolver {
	@Query(() => [Visitor])
	async getAllVisitor() {
		return await Visitor.find();
	}

	@Query(() => Visitor)
	async getVisitorByEmail(email: string) {
		return await Visitor.findOne({where: {email}});
	}
}

const visitorUtils = {
	getVisitorByEmail: async (email: string) => {
		return await Visitor.findOne({where: {email}});
	},

	getUploads: async (visitorId: number) => {
		return await Visitor.findOne({where: {id: visitorId}, relations: ['uploads']});
	},

	deleteVisitor: async (visitor: any, createdUser: any) => {
		await Visitor.createQueryBuilder()
			.relation(Visitor, 'uploads')
			.of(visitor)
			.remove(createdUser.uploads);

		return await Visitor.delete({id: visitor.id});
	}
};

export {visitorUtils};
export default VisitorResolver;
