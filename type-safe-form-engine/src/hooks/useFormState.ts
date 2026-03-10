import { useState, useCallback } from "react";
import type { ObjectSchema, InferSchema } from "../types/field";
import type { StringField, NumberField, BooleanField } from "../types/field";

type BasicFieldType = StringField | NumberField | BooleanField;

interface UseFormStateReturn<T extends ObjectSchema> {
  values: InferSchema<T>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleChange: (
    fieldName: string,
    fieldValue: string | number | boolean,
  ) => void;
  handleBlur: (fieldName: string) => void;
  handleSubmit: (
    onSubmit: (values: InferSchema<T>) => void,
  ) => (e: React.SyntheticEvent<HTMLFormElement>) => void;
  reset: () => void;
  setValues: (values: InferSchema<T>) => void;
}

const isBasicField = (field: any): field is BasicFieldType => {
  return (
    field.type === "string" ||
    field.type === "number" ||
    field.type === "boolean"
  );
};

/**
 * useFormState Hook
 * Manages form state with full type safety
 *
 * @param schema - The form schema
 * @returns Form state and handlers (values, errors, touched, handleChange, handleBlur, handleSubmit, reset)
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
          values[key] = 0;
          break;
        case "boolean":
          values[key] = false;
          break;
      }
    });
    return values as InferSchema<T>;
  }, [schema]);

  const [values, setValues] = useState<InferSchema<T>>(initializeValues());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = useCallback(
    (fieldName: string, fieldValue: string | number | boolean) => {
      setValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue,
      }));
    },
    [],
  );

  const handleBlur = useCallback((fieldName: string) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: InferSchema<T>) => void) =>
      (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(values);
      },
    [values],
  );

  const reset = useCallback(() => {
    setValues(initializeValues());
    setErrors({});
    setTouched({});
  }, [initializeValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
};
