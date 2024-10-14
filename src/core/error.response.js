'use strict'

const StatusCode = {
    CONFLICT: 409,
    FORBIDDEN: 403,
    BAD_REQUEST: 400
}

const ReasonStatusCode = {
    CONFLICT: 'Conflict error',
    FORBIDDEN: 'Forbidden error',
    BAD_REQUEST: 'Bad request error'
}

class ErrorResponse extends Error {
    constructor (message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor (message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    constructor (message = ReasonStatusCode.BAD_REQUEST, statusCode = StatusCode.BAD_REQUEST) {
        super(message, statusCode)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
}
