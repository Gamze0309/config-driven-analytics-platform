import type { FieldSchema, ObjectSchema } from "../types/field";
import {
  PREDEFINED_SCHEMAS,
  type PredefinedSchemaKey,
  type PredefinedSchemaTypes,
} from "../schema/predefined";

const fieldToTypeString = (field: FieldSchema, depth = 0): string => {
  switch (field.type) {
    case "string":
      return "string";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return objectToTypeString(field, depth);
    default:
      return "unknown";
  }
};

const objectToTypeString = (schema: ObjectSchema, depth = 0): string => {
  const indent = "  ".repeat(depth);
  const nextIndent = "  ".repeat(depth + 1);

  const fields = Object.entries(schema.fields)
    .map(([key, field]) => {
      const optionalMarker = field.required ? "" : "?";
      return `${nextIndent}${key}${optionalMarker}: ${fieldToTypeString(field, depth + 1)};`;
    })
    .join("\n");

  return `\{\n${fields}\n${indent}}`;
};

export const generateTypeDefinition = (
  schema: ObjectSchema,
  typeName: string,
): string => {
  return `type ${typeName} = ${objectToTypeString(schema)};`;
};

const toTypeName = (schemaKey: PredefinedSchemaKey): string => {
  return schemaKey.charAt(0).toUpperCase() + schemaKey.slice(1);
};

const buildSubmitHandlerPreview = <K extends PredefinedSchemaKey>(
  schemaKey: K,
  _values?: PredefinedSchemaTypes[K],
): string => {
  const typeName = toTypeName(schemaKey);
  return `const handleSubmit = (values: ${typeName}) => {\n  console.log(values);\n};`;
};

const predefinedTypeDefinitions = (
  Object.keys(PREDEFINED_SCHEMAS) as PredefinedSchemaKey[]
).reduce<Record<PredefinedSchemaKey, { type: string; handler: string }>>(
  (acc, schemaKey) => {
    const schema = PREDEFINED_SCHEMAS[schemaKey];
    const typeName = toTypeName(schemaKey);

    acc[schemaKey] = {
      type: generateTypeDefinition(schema, typeName),
      handler: buildSubmitHandlerPreview(schemaKey),
    };

    return acc;
  },
  {} as Record<PredefinedSchemaKey, { type: string; handler: string }>,
);

export const getPredefinedTypePreview = (schemaKey: PredefinedSchemaKey) => {
  return predefinedTypeDefinitions[schemaKey];
};
