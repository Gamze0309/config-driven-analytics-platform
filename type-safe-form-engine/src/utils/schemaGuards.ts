import type {
  BooleanField,
  FieldSchema,
  NumberField,
  StringField,
} from "../types/field";

export type BasicFieldType = StringField | NumberField | BooleanField;

export const isBasicField = (field: FieldSchema): field is BasicFieldType => {
  return (
    field.type === "string" ||
    field.type === "number" ||
    field.type === "boolean"
  );
};
