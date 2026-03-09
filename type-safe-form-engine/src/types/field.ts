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

type InferField<F extends FieldSchema> = F extends { type: "string" }
  ? string
  : F extends { type: "number" }
    ? number
    : F extends { type: "boolean" }
      ? boolean
      : F extends { type: "object"; fields: infer FS }
        ? FS extends Record<string, FieldSchema>
          ? InferFields<FS>
          : never
        : never;

type RequiredKeys<FS extends Record<string, FieldSchema>> = {
  [K in keyof FS]-?: FS[K] extends { required: true } ? K : never;
}[keyof FS];

type OptionalKeys<FS extends Record<string, FieldSchema>> = Exclude<
  keyof FS,
  RequiredKeys<FS>
>;

type InferFields<FS extends Record<string, FieldSchema>> = {
  [K in RequiredKeys<FS>]-?: InferField<FS[K]>;
} & { [K in OptionalKeys<FS>]?: InferField<FS[K]> };

export type InferSchema<S extends ObjectSchema> = InferField<S>;
