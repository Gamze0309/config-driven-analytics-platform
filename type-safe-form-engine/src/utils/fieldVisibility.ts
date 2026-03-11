import type { Condition, FieldSchema } from "../types/field";
import { isBasicField } from "./schemaGuards";

export const isFieldVisible = (
  condition: Condition | undefined,
  fieldValue: unknown,
): boolean => {
  if (condition) {
    return fieldValue === condition.value;
  }
  return true;
};

export const shouldRenderField = (
  field: FieldSchema,
  values: Record<string, unknown>,
): boolean => {
  if (!isBasicField(field)) return true;

  const dependencyFieldName = field.visible?.fieldName;
  return !(
    field.visible &&
    dependencyFieldName &&
    !isFieldVisible(field.visible, values[dependencyFieldName])
  );
};
