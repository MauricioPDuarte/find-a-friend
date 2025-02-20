import { Prisma, Org } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string) {
    return await prisma.org.findFirst({ where: { email } });
  }

  async findById(id: string) {
    return await prisma.org.findUnique({ where: { id } });
  }

  async create(data: Prisma.OrgCreateInput) {
    return await prisma.org.create({ data });
  }
}
