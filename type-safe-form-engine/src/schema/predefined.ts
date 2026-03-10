import type { InferSchema, ObjectSchema } from "../types/field";

export const userProfileSchema = {
  type: "object" as const,
  fields: {
    username: { type: "string" as const, required: true },
    email: { type: "string" as const, required: true },
    age: { type: "number" as const },
    newsletter: { type: "boolean" as const, required: true },
  },
} satisfies ObjectSchema;

export const contactFormSchema = {
  type: "object" as const,
  fields: {
    name: { type: "string" as const, required: true },
    email: { type: "string" as const, required: true },
    message: { type: "string" as const, required: true },
  },
} satisfies ObjectSchema;

export const productSchema = {
  type: "object" as const,
  fields: {
    productName: { type: "string" as const, required: true },
    price: { type: "number" as const, required: true },
    inStock: { type: "boolean" as const, required: true },
    sku: { type: "string" as const },
  },
} satisfies ObjectSchema;

export const PREDEFINED_SCHEMAS = {
  userProfile: userProfileSchema,
  contact: contactFormSchema,
  product: productSchema,
} as const;

export type PredefinedSchemaKey = keyof typeof PREDEFINED_SCHEMAS;

export type PredefinedSchemaTypes = {
  [K in PredefinedSchemaKey]: InferSchema<(typeof PREDEFINED_SCHEMAS)[K]>;
};

export type PredefinedSubmissionState = {
  [K in PredefinedSchemaKey]: {
    schemaKey: K;
    values: PredefinedSchemaTypes[K];
  };
}[PredefinedSchemaKey];

type SubmissionStateFor<K extends PredefinedSchemaKey> = Extract<
  PredefinedSubmissionState,
  { schemaKey: K }
>;

export const createSubmissionState = <K extends PredefinedSchemaKey>(
  schemaKey: K,
  values: PredefinedSchemaTypes[K],
): SubmissionStateFor<K> => {
  return {
    schemaKey,
    values,
  } as SubmissionStateFor<K>;
};
