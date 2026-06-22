export type DatabaseError = {
  code?: string;
  detail?: string;
  constraint?: string;
};

export function isDatabaseError(err: unknown): err is DatabaseError {
  return typeof err === "object" && err !== null && "code" in err;
}
