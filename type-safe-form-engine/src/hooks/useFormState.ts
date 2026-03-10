import { useState, useCallback } from "react";
import type { ObjectSchema, InferSchema, FieldSchema } from "../types/field";
import { isBasicField, isObjectField } from "../utils/schemaGuards";

interface UseFormStateReturn<T extends ObjectSchema> {
  values: InferSchema<T>;
  handleChange: (
    fieldName: string,
    fieldValue: string | number | boolean | Record<string, unknown>,
  ) => void;
  handleSubmit: (
    onSubmit: (values: InferSchema<T>) => void,
  ) => (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

/**
 * useFormState Hook
 * Manages form state with full type safety, including nested objects
 *
 * @param schema - The form schema (supports nested ObjectSchema fields)
 * @returns Form state and handlers (values, handleChange, handleSubmit)
 *
 * @example
 * const { values, handleChange, handleSubmit } = useFormState(userProfileSchema);
 *
 */
export const useFormState = <T extends ObjectSchema>(
  schema: T,
): UseFormStateReturn<T> => {
  const initializeValues = useCallback((): InferSchema<T> => {
    const values: Record<string, unknown> = {};

    const initializeField = (field: FieldSchema): unknown => {
      if (isBasicField(field)) {
        switch (field.type) {
          case "string":
            return "";
          case "number":
            return 0;
          case "boolean":
            return false;
        }
      }

      if (isObjectField(field)) {
        return initializeNestedObject(field);
      }

      return undefined;
    };

    const initializeNestedObject = (
      schema: ObjectSchema,
    ): Record<string, unknown> => {
      const nested: Record<string, unknown> = {};
      Object.entries(schema.fields).forEach(([key, field]) => {
        nested[key] = initializeField(field);
      });
      return nested;
    };

    Object.entries(schema.fields).forEach(([key, field]) => {
      values[key] = initializeField(field);
    });

    return values as InferSchema<T>;
  }, [schema]);

  const [values, setValues] = useState<InferSchema<T>>(initializeValues());

  const handleChange = useCallback(
    (
      fieldName: string,
      fieldValue: string | number | boolean | Record<string, unknown>,
    ) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (onSubmit: (values: InferSchema<T>) => void) =>
      (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
      },
    [values],
  );

  return {
    values,
    handleChange,
    handleSubmit,
  };
};
