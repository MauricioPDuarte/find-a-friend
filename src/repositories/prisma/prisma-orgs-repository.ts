import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org> {
    throw new Error("Method not implemented.");
  }
}
