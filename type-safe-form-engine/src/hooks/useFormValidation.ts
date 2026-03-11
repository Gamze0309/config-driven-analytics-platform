import { useState, useCallback } from "react";
import type { ObjectSchema, InferSchema } from "../types/field";
import {
  validateSchema,
  type ValidationResult,
} from "../utils/validationBuilder";

interface UseFormValidationReturn {
  errors: Record<string, string>;
  isValid: boolean;
  validate: () => boolean;
  clearError: (fieldName: string) => void;
  clearAllErrors: () => void;
}

/**
 * Manages form validation state against a schema.
 * Returns errors map, validity status, and methods to validate/clear errors.
 * Field paths use dot notation for nested objects (e.g., "address.street").
 */
export const useFormValidation = <T extends ObjectSchema>(
  schema: T,
  values: InferSchema<T>,
): UseFormValidationReturn => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    errors: [],
    isValid: true,
    errorMap: {},
  });

  const validate = useCallback((): boolean => {
    const result = validateSchema(values as Record<string, unknown>, schema);
    setValidationResult(result);
    return result.isValid;
  }, [values, schema]);

  const clearError = useCallback((fieldName: string) => {
    setValidationResult((prev) => {
      const newErrorMap = { ...prev.errorMap };
      delete newErrorMap[fieldName];

      return {
        ...prev,
        errorMap: newErrorMap,
        errors: prev.errors.filter((e) => e.field !== fieldName),
        isValid: Object.keys(newErrorMap).length === 0,
      };
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setValidationResult({
      errors: [],
      isValid: true,
      errorMap: {},
    });
  }, []);

  return {
    errors: validationResult.errorMap,
    isValid: validationResult.isValid,
    validate,
    clearError,
    clearAllErrors,
  };
};
