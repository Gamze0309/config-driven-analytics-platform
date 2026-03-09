import type { ObjectSchema, InferSchema } from "../types/field";
import type { StringField, NumberField, BooleanField } from "../types/field";
import { useFormState } from "../hooks/useFormState";
import DynamicField from "./DynamicField";

type BasicFieldType = StringField | NumberField | BooleanField;

interface DynamicFormProps<T extends ObjectSchema> {
  schema: T;
  onSubmit?: (values: InferSchema<T>) => void;
}

const isBasicField = (field: any): field is BasicFieldType => {
  return (
    field.type === "string" ||
    field.type === "number" ||
    field.type === "boolean"
  );
};

const DynamicForm = <T extends ObjectSchema>({
  schema,
  onSubmit,
}: DynamicFormProps<T>) => {
  // Use the custom hook for all form state management
  const { values, handleChange, handleSubmit } = useFormState(schema);

  return (
    <form
      onSubmit={handleSubmit((submittedValues) => {
        if (onSubmit) {
          onSubmit(submittedValues);
        }
        console.log("Form submitted with values:", submittedValues);
      })}
      className="dynamic-form"
    >
      <div className="form-fields">
        {Object.entries(schema.fields).map(([fieldName, field]) => {
          if (!isBasicField(field)) return null;

          return (
            <DynamicField
              key={fieldName}
              field={field}
              name={fieldName}
              value={values[fieldName] as string | number | boolean}
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
