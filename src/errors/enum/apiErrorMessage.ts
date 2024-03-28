enum ApiErrorMessage {
  InternalServerError = 'A unknown error ocurred. Please try again later!',
  BadRequestError = 'The payload is invalid.',
  NotFoundError = 'No items matches with the query.',
  UnauthorizedAccessError = 'You are not allowed to access this content.',
  DuplicatedContentError = 'The entered value is already registered'
}

export default ApiErrorMessage;