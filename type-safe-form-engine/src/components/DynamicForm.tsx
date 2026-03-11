import type { ObjectSchema, InferSchema } from "../types/field";
import { useFormState } from "../hooks/useFormState";
import { useFormValidation } from "../hooks/useFormValidation";
import { isBasicField, isObjectField } from "../utils/schemaGuards";
import { isFieldVisible } from "../utils/fieldVisibility";
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
  const {
    values,
    handleChange,
    handleSubmit: createHandleSubmit,
  } = useFormState(schema);
  const { errors, validate } = useFormValidation(schema, values);

  const handleSubmit = createHandleSubmit((submittedValues) => {
    if (!validate()) {
      return;
    }
    onSubmit?.(submittedValues);
  });

  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      <div className="form-fields">
        {Object.entries(schema.fields).map(([fieldName, field]) => {
          // Check visibility condition (only for basic fields)
          if (isBasicField(field)) {
            const dependencyFieldName = field.visible?.fieldName;
            if (
              field.visible &&
              dependencyFieldName &&
              !isFieldVisible(field.visible, values[dependencyFieldName])
            ) {
              return null;
            }

            return (
              <DynamicField
                key={fieldName}
                field={field}
                name={fieldName}
                value={values[fieldName] as string | number | boolean}
                onChange={(value) => handleChange(fieldName, value)}
                error={errors[fieldName]}
              />
            );
          }

          if (isObjectField(field)) {
            const nestedValues = values[fieldName] as Record<string, unknown>;

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
                errors={errors}
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
