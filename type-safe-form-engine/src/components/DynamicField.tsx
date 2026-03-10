import { type FC, type ChangeEvent } from "react";
import type { StringField, NumberField, BooleanField } from "../types/field";

type FieldType = StringField | NumberField | BooleanField;

interface DynamicFieldProps {
  field: FieldType;
  name: string;
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
}

const DynamicField: FC<DynamicFieldProps> = ({
  field,
  name,
  value,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (field.type) {
      case "number":
        onChange(e.target.value ? Number(e.target.value) : "");
        break;
      case "boolean":
        onChange(e.target.checked);
        break;
      case "string":
      default:
        onChange(e.target.value);
        break;
    }
  };

  const isRequired = field.required || false;

  switch (field.type) {
    case "string":
      return (
        <div className="form-group">
          <label htmlFor={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {isRequired && <span className="required">*</span>}
          </label>
          <input
            id={name}
            type="text"
            name={name}
            value={(value as string | undefined) ?? ""}
            onChange={handleChange}
            required={isRequired}
            className="form-input"
          />
        </div>
      );

    case "number":
      return (
        <div className="form-group">
          <label htmlFor={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {isRequired && <span className="required">*</span>}
          </label>
          <input
            id={name}
            type="number"
            name={name}
            value={(value as number | undefined) ?? 0}
            onChange={handleChange}
            required={isRequired}
            className="form-input"
          />
        </div>
      );

    case "boolean":
      return (
        <div className="form-group checkbox">
          <label htmlFor={name}>
            <input
              id={name}
              type="checkbox"
              name={name}
              checked={(value as boolean | undefined) ?? false}
              onChange={handleChange}
              required={isRequired}
              className="form-checkbox"
            />
            {name.charAt(0).toUpperCase() + name.slice(1)}
            {isRequired && <span className="required">*</span>}
          </label>
        </div>
      );

    default:
      return <div>Unsupported field type</div>;
  }
};

export default DynamicField;
