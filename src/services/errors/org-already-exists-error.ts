export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Org with given email already exists");
  }
}
