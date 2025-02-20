export class ResourseNotFoundError extends Error {
  constructor() {
    super("RESOURCE_NOT_FOUND");
  }
}
