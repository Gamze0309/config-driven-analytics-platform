import type { ObjectSchema, InferSchema } from "../types/field";
import { useFormState } from "../hooks/useFormState";
import { isBasicField } from "../utils/schemaGuards";
import DynamicField from "./DynamicField";

interface DynamicFormProps<T extends ObjectSchema> {
  schema: T;
  onSubmit?: (values: InferSchema<T>) => void;
}

const DynamicForm = <T extends ObjectSchema>({
  schema,
  onSubmit,
}: DynamicFormProps<T>) => {
  const { values, handleChange, handleSubmit } = useFormState(schema);

  return (
    <form
      onSubmit={handleSubmit((submittedValues) => {
        onSubmit?.(submittedValues);
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
