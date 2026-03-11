import type { FC } from "react";
import type { ObjectSchema } from "../types/field";
import { isBasicField, isObjectField } from "../utils/schemaGuards";
import DynamicField from "./DynamicField";

interface ObjectFieldProps {
  schema: ObjectSchema;
  values: Record<string, unknown>;
  onChange: (fieldName: string, value: unknown) => void;
  name?: string;
  errors?: Record<string, string>;
}

const ObjectField: FC<ObjectFieldProps> = ({
  schema,
  values,
  onChange,
  name,
  errors = {},
}) => {
  const nestingClass = name ? "nested-object-field" : "object-field";

  const getFieldError = (fieldName: string): string | undefined => {
    const fullPath = name ? `${name}.${fieldName}` : fieldName;
    return errors[fullPath];
  };

  return (
    <div className={nestingClass}>
      {name && <h4 className="nested-field-title">{name}</h4>}
      <div className="nested-form-fields">
        {Object.entries(schema.fields).map(([fieldName, field]) => {
          const currentValue = values[fieldName];

          if (isBasicField(field)) {
            return (
              <DynamicField
                key={fieldName}
                field={field}
                name={fieldName}
                value={currentValue as string | number | boolean}
                onChange={(value) => onChange(fieldName, value)}
                error={getFieldError(fieldName)}
              />
            );
          }

          if (isObjectField(field)) {
            const nestedValues = currentValue as Record<string, unknown>;

            return (
              <ObjectField
                key={fieldName}
                schema={field}
                values={nestedValues}
                onChange={(nestedFieldName, value) => {
                  onChange(fieldName, {
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
    </div>
  );
};

export default ObjectField;
