// Custom error classes for centralized error handling

export class CustomError extends Error {
  constructor(
    public httpStatusCode: number,
    public message: string,
    public details: unknown = null,
  ) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }

  serialize() {
    return {
      message: this.message,
      statusCode: this.httpStatusCode,
      details: this.details,
      stack: process.env.NODE_ENV === "development" ? this.stack : undefined,
    };
  }
}

export class BadRequestError extends CustomError {
  constructor(message = "Bad request", details: unknown = null) {
    super(400, message, details);
  }
}

export class ValidationError extends CustomError {
  constructor(details: Record<string, string>) {
    super(400, "Validation failed", details);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = "Not found") {
    super(404, message);
  }
}

export class ConflictError extends CustomError {
  constructor(message = "Resource already exists", details: unknown = null) {
    super(409, message, details);
  }
}
