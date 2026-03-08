export type StringField = { type: "string"; required?: boolean };
export type NumberField = { type: "number"; required?: boolean };
export type BooleanField = { type: "boolean"; required?: boolean };

export type ObjectSchema = {
  type: "object";
  required?: boolean;
  fields: Record<string, FieldSchema>;
};

export type FieldSchema =
  | StringField
  | NumberField
  | BooleanField
  | ObjectSchema;

export type RuntimeSchema = ObjectSchema;
