import type { FC } from "react";
import type { ObjectSchema } from "../types/field";
import { isBasicField, isObjectField } from "../utils/schemaGuards";
import DynamicField from "./DynamicField";

interface ObjectFieldProps {
  schema: ObjectSchema;
  values: Record<string, unknown>;
  onChange: (fieldName: string, value: unknown) => void;
  name?: string;
}

const ObjectField: FC<ObjectFieldProps> = ({
  schema,
  values,
  onChange,
  name,
}) => {
  const nestingClass = name ? "nested-object-field" : "object-field";

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
                value={
                  (currentValue as string | number | boolean | undefined) ?? ""
                }
                onChange={(value) => onChange(fieldName, value)}
              />
            );
          }

          if (isObjectField(field)) {
            const nestedValues =
              typeof currentValue === "object" && currentValue !== null
                ? (currentValue as Record<string, unknown>)
                : {};

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
