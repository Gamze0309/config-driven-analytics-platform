import type { ObjectSchema, InferSchema } from "../types/field";
import { useFormState } from "../hooks/useFormState";
import { isBasicField, isObjectField } from "../utils/schemaGuards";
import DynamicField from "./DynamicField";
import ObjectField from "./ObjectField";

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
          if (isBasicField(field)) {
            return (
              <DynamicField
                key={fieldName}
                field={field}
                name={fieldName}
                value={
                  (values[fieldName] as
                    | string
                    | number
                    | boolean
                    | undefined) ?? ""
                }
                onChange={(value) => handleChange(fieldName, value)}
              />
            );
          }

          if (isObjectField(field)) {
            const nestedValues =
              typeof values[fieldName] === "object" &&
              values[fieldName] !== null
                ? (values[fieldName] as Record<string, unknown>)
                : {};

            return (
              <ObjectField
                key={fieldName}
                schema={field}
                values={nestedValues}
                onChange={(nestedFieldName, value) => {
                  handleChange(fieldName, {
                    ...nestedValues,
                    [nestedFieldName]: value,
                  });
                }}
                name={fieldName}
              />
            );
          }

          return null;
        })}
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
