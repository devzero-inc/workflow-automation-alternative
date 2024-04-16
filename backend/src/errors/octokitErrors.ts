class OctokitError extends Error {
  code: string;
  
  constructor(message: string, code: string) {
      super(message);
      this.code = code;
  }
}

class NotAuthenticatedError extends OctokitError {
  constructor(message: string) {
      super(message, 'AUTH_DENIED');
  }
}

class AccessDeniedError extends OctokitError {
  constructor(message: string) {
      super(message, 'ACCESS_DENIED');
  }
}

class NotFound extends OctokitError {
  constructor(message: string) {
      super(message, 'NOT_FOUND');
  }
}

class UnhandledError extends OctokitError {
  constructor(message: string) {
      super(message, 'UNHANDLED_ERROR');
  }
}

export { NotAuthenticatedError, AccessDeniedError, NotFound, UnhandledError };