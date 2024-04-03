export class ResourceNotFindError extends Error {
  constructor() {
    super('Resource not found')
  }
}
