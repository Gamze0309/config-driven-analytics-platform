import { useState } from "react";
import type { ObjectSchema, InferSchema } from "../types/field";
import type { StringField, NumberField, BooleanField } from "../types/field";
import DynamicField from "./DynamicField";

type BasicFieldType = StringField | NumberField | BooleanField;

interface DynamicFormProps<T extends ObjectSchema> {
  schema: T;
  onSubmit?: (values: InferSchema<T>) => void;
}

const DynamicForm = <T extends ObjectSchema>({
  schema,
  onSubmit,
}: DynamicFormProps<T>) => {
  const isBasicField = (field: any): field is BasicFieldType => {
    return (
      field.type === "string" ||
      field.type === "number" ||
      field.type === "boolean"
    );
  };

  const initializeValues = () => {
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
    return values;
  };

  const [values, setValues] = useState(initializeValues());

  const handleChange = (
    fieldName: string,
    fieldValue: string | number | boolean,
  ) => {
    setValues((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values as InferSchema<T>);
    }
    console.log("Form submitted with values:", values);
  };

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <div className="form-fields">
        {Object.entries(schema.fields).map(([fieldName, field]) => {
          if (!isBasicField(field)) return null;

          return (
            <DynamicField
              key={fieldName}
              field={field}
              name={fieldName}
              value={values[fieldName]}
              onChange={(value) => handleChange(fieldName, value)}
            />
          );
        })}
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
