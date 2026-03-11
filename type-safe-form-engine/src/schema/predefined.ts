import type { InferSchema, ObjectSchema } from "../types/field";

export const userProfileSchema = {
  type: "object" as const,
  fields: {
    username: {
      type: "string" as const,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    email: {
      type: "string" as const,
      required: true,
      format: "email" as const,
    },
    age: { type: "number" as const, min: 20, max: 80 },
    newsletter: { type: "boolean" as const, required: true },
  },
} satisfies ObjectSchema;

export const contactFormSchema = {
  type: "object" as const,
  fields: {
    name: {
      type: "string" as const,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    email: {
      type: "string" as const,
      required: true,
      format: "email" as const,
    },
    message: {
      type: "string" as const,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
  },
} satisfies ObjectSchema;

export const productSchema = {
  type: "object" as const,
  fields: {
    productName: {
      type: "string" as const,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    price: { type: "number" as const, required: true, min: 0 },
    inStock: { type: "boolean" as const, required: true },
    sku: { type: "string" as const, minLength: 5, maxLength: 20 },
  },
} satisfies ObjectSchema;

export const userWithAddressSchema = {
  type: "object" as const,
  fields: {
    firstName: {
      type: "string" as const,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: "string" as const,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: "string" as const,
      required: true,
      format: "email" as const,
    },
    address: {
      type: "object" as const,
      required: true,
      fields: {
        street: {
          type: "string" as const,
          required: true,
          minLength: 3,
          maxLength: 120,
        },
        city: {
          type: "string" as const,
          required: true,
          minLength: 2,
          maxLength: 50,
        },
        zipCode: {
          type: "string" as const,
          required: true,
          pattern: "^[0-9]{3,5}$",
        },
        country: { type: "string" as const, minLength: 2, maxLength: 50 },
      },
    },
    isActive: { type: "boolean" as const, required: true },
  },
} satisfies ObjectSchema;

export const PREDEFINED_SCHEMAS = {
  userProfile: userProfileSchema,
  contact: contactFormSchema,
  product: productSchema,
  userWithAddress: userWithAddressSchema,
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
