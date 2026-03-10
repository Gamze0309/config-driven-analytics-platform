import { useState, useCallback } from "react";
import type { ObjectSchema, InferSchema } from "../types/field";
import { isBasicField } from "../utils/schemaGuards";

interface UseFormStateReturn<T extends ObjectSchema> {
  values: InferSchema<T>;
  handleChange: (
    fieldName: string,
    fieldValue: string | number | boolean,
  ) => void;
  handleSubmit: (
    onSubmit: (values: InferSchema<T>) => void,
  ) => (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

/**
 * useFormState Hook
 * Manages form state with full type safety
 *
 * @param schema - The form schema
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
    const values: Record<string, string | number | boolean> = {};
    Object.entries(schema.fields).forEach(([key, field]) => {
      if (!isBasicField(field)) return;

      switch (field.type) {
        case "string":
          values[key] = "";
          break;
        case "number":
          values[key] = "";
          break;
        case "boolean":
          values[key] = false;
          break;
      }
    });
    return values as InferSchema<T>;
  }, [schema]);

  const [values, setValues] = useState<InferSchema<T>>(initializeValues());

  const handleChange = useCallback(
    (fieldName: string, fieldValue: string | number | boolean) => {
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
