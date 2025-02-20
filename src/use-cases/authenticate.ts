import { Org } from "@prisma/client";
import { OrgsRepository } from "../repositories/orgs-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  org: Org;
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) {
      console.log("AQUI1");
      throw new InvalidCredentialsError();
    }

    console.log(await compare(password, org.password));

    const password_match = await compare(password, org.password);

    if (!password_match) {
      throw new InvalidCredentialsError();
    }

    return { org };
  }
}
