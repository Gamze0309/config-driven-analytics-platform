import type {
  BooleanField,
  FieldSchema,
  NumberField,
  ObjectSchema,
  StringField,
} from "../types/field";
import type { PredefinedSchemaKey } from "../schema/predefined";
import { PREDEFINED_SCHEMAS } from "../schema/predefined";
import { isBasicField, isObjectField } from "./schemaGuards";

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  errors: ValidationError[];
  isValid: boolean;
  errorMap: Record<string, string>;
}

const validateStringField = (
  value: unknown,
  field: StringField,
  fieldName: string,
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const strValue = String(value ?? "");

  if (field.required && !strValue.trim()) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
      code: "required",
    });
    return errors;
  }

  if (!strValue && !field.required) {
    return errors;
  }

  if (field.minLength !== undefined && strValue.length < field.minLength) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at least ${field.minLength} characters`,
      code: "minLength",
    });
  }

  if (field.maxLength !== undefined && strValue.length > field.maxLength) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at most ${field.maxLength} characters`,
      code: "maxLength",
    });
  }

  if (field.pattern) {
    const regex = new RegExp(field.pattern);
    if (!regex.test(strValue)) {
      errors.push({
        field: fieldName,
        message: `${fieldName} format is invalid`,
        code: "pattern",
      });
    }
  }

  if (field.format) {
    switch (field.format) {
      case "email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(strValue)) {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be a valid email`,
            code: "format:email",
          });
        }
        break;
      }
      case "url": {
        try {
          new URL(strValue);
        } catch {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be a valid URL`,
            code: "format:url",
          });
        }
        break;
      }
      case "date": {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(strValue)) {
          errors.push({
            field: fieldName,
            message: `${fieldName} must be in YYYY-MM-DD format`,
            code: "format:date",
          });
        }
        break;
      }
    }
  }

  return errors;
};

const validateNumberField = (
  value: unknown,
  field: NumberField,
  fieldName: string,
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const numValue = Number(value ?? 0);

  if (
    field.required &&
    (value === undefined || value === null || value === "")
  ) {
    errors.push({
      field: fieldName,
      message: `${fieldName} is required`,
      code: "required",
    });
    return errors;
  }

  if (isNaN(numValue) && !field.required) {
    return errors;
  }

  if (isNaN(numValue)) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be a number`,
      code: "type",
    });
    return errors;
  }

  if (field.min !== undefined && numValue < field.min) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at least ${field.min}`,
      code: "min",
    });
  }

  if (field.max !== undefined && numValue > field.max) {
    errors.push({
      field: fieldName,
      message: `${fieldName} must be at most ${field.max}`,
      code: "max",
    });
  }

  return errors;
};

const validateBooleanField = (
  _value: unknown,
  _field: BooleanField,
  _fieldName: string,
): ValidationError[] => {
  return [];
};

export const validateField = (
  fieldName: string,
  value: unknown,
  field: FieldSchema,
): ValidationError[] => {
  if (isBasicField(field)) {
    switch (field.type) {
      case "string":
        return validateStringField(value, field, fieldName);
      case "number":
        return validateNumberField(value, field, fieldName);
      case "boolean":
        return validateBooleanField(value, field, fieldName);
    }
  }

  if (isObjectField(field)) {
    const nestedValue = value as Record<string, unknown>;
    const nestedErrors: ValidationError[] = [];

    Object.entries(field.fields).forEach(([nestedFieldName, nestedField]) => {
      const errors = validateField(
        nestedFieldName,
        nestedValue?.[nestedFieldName],
        nestedField,
      );
      nestedErrors.push(
        ...errors.map((err) => ({
          ...err,
          field: `${fieldName}.${err.field}`,
        })),
      );
    });

    return nestedErrors;
  }

  return [];
};

export const validateSchema = (
  values: Record<string, unknown>,
  schema: ObjectSchema,
): ValidationResult => {
  const errors: ValidationError[] = [];
  const errorMap: Record<string, string> = {};

  Object.entries(schema.fields).forEach(([fieldName, field]) => {
    const fieldErrors = validateField(fieldName, values[fieldName], field);
    errors.push(...fieldErrors);

    fieldErrors.forEach((err) => {
      if (!errorMap[err.field]) {
        errorMap[err.field] = err.message;
      }
    });
  });

  return {
    errors,
    isValid: errors.length === 0,
    errorMap,
  };
};

export const getValidationRulesForField = (
  field: FieldSchema,
): Record<string, unknown> => {
  const rules: Record<string, unknown> = {};

  if (isBasicField(field)) {
    if (field.required) rules.required = true;

    if (field.type === "string") {
      const sf = field as StringField;
      if (sf.minLength !== undefined) rules.minLength = sf.minLength;
      if (sf.maxLength !== undefined) rules.maxLength = sf.maxLength;
      if (sf.pattern !== undefined) rules.pattern = sf.pattern;
      if (sf.format !== undefined) rules.format = sf.format;
    }

    if (field.type === "number") {
      const nf = field as NumberField;
      if (nf.min !== undefined) rules.min = nf.min;
      if (nf.max !== undefined) rules.max = nf.max;
    }
  }

  return rules;
};

export const getValidationRulesText = (
  schemaKey: PredefinedSchemaKey,
): string => {
  const schema = PREDEFINED_SCHEMAS[schemaKey];
  const rules: string[] = [];

  const collectRules = (fields: Record<string, any>, prefix = "") => {
    Object.entries(fields).forEach(([fieldName, field]) => {
      const fullPath = prefix ? `${prefix}.${fieldName}` : fieldName;

      if (isObjectField(field)) {
        collectRules(field.fields, fullPath);
      } else {
        const fieldRules = getValidationRulesForField(field);
        const ruleEntries = Object.entries(fieldRules)
          .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
          .join(", ");

        if (ruleEntries) {
          rules.push(`${fullPath}: { ${ruleEntries} }`);
        }
      }
    });
  };

  collectRules(schema.fields);
  return rules.length > 0 ? rules.join("\n") : "No validation rules";
};
