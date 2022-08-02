import { InternalException } from "../pages/api/exceptions/internal.exception";

export function ensureNonNullable<T>(
  data: T | null | undefined,
  { message }: { message?: string } = {}
): NonNullable<T> {
  if (data === null || data === undefined) {
    throw new InternalException(
      message ??
        "Parece que não temos um dos dados necessários para esta operação"
    );
  }

  return data as NonNullable<T>;
}
