import type { Condition } from "../types/field";

export const isFieldVisible = (
  condition: Condition | undefined,
  fieldValue: unknown,
): boolean => {
  if (condition) {
    return fieldValue === condition.value;
  }
  return true;
};
