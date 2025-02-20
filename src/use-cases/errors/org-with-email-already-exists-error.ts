export class OrgWithEmailAlreadyExistsError extends Error {
  constructor() {
    super("ORG_WITH_EMAIL_ALREADY_EXISTS");
  }
}
