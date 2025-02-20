import { Org } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgWithEmailAlreadyExistsError } from "./errors/org-with-email-already-exists-error";

interface CreateOrgUseCaseRequest {
  name: string;
  author_name: string;
  email: string;
  whatsapp: string;
  password: string;

  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;

  latitude: number;
  longitude: number;
}

interface CreateOrUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}

  async execute({
    name,
    author_name,
    email,
    whatsapp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrUseCaseResponse> {
    const existsByEmail = await this.orgRepository.findByEmail(email);

    if (existsByEmail) {
      throw new OrgWithEmailAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgRepository.create({
      name,
      author_name,
      email,
      whatsapp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    });

    return { org };
  }
}
