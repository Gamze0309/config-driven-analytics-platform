export type AppErrorCode =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'SERVER'
  | 'NETWORK'
  | 'TIMEOUT'
  | 'UNKNOWN';

export type AppErrorDetails = unknown;

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status?: number;
  readonly details?: AppErrorDetails;

  constructor(params: { message: string; code: AppErrorCode; status?: number; details?: AppErrorDetails }) {
    super(params.message);
    this.name = 'AppError';
    this.code = params.code;
    this.status = params.status;
    this.details = params.details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) return error;
  const message = error instanceof Error ? error.message : String(error);
  return new AppError({ message, code: 'UNKNOWN', details: error });
}
