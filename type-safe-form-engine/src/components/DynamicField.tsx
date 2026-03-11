import { type FC, type ChangeEvent } from "react";
import type { StringField, NumberField, BooleanField } from "../types/field";
import { capitalize } from "../utils/format";

type FieldType = StringField | NumberField | BooleanField;

interface DynamicFieldProps {
  field: FieldType;
  name: string;
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  error?: string;
}

const DynamicField: FC<DynamicFieldProps> = ({
  field,
  name,
  value,
  onChange,
  error,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (field.type) {
      case "number":
        onChange(e.target.value ? Number(e.target.value) : 0);
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
  const hasError = !!error;

  switch (field.type) {
    case "string":
      return (
        <div className={`form-group ${hasError ? "has-error" : ""}`}>
          <label htmlFor={name}>
            {capitalize(name)}
            {isRequired && <span className="required">*</span>}
          </label>
          <input
            id={name}
            type="text"
            name={name}
            value={value as string}
            onChange={handleChange}
            required={isRequired}
            className={`form-input ${hasError ? "input-error" : ""}`}
            aria-invalid={hasError}
          />
          {hasError && <span className="form-error">{error}</span>}
        </div>
      );

    case "number":
      return (
        <div className={`form-group ${hasError ? "has-error" : ""}`}>
          <label htmlFor={name}>
            {capitalize(name)}
            {isRequired && <span className="required">*</span>}
          </label>
          <input
            id={name}
            type="number"
            name={name}
            value={value as number}
            onChange={handleChange}
            required={isRequired}
            className={`form-input ${hasError ? "input-error" : ""}`}
            aria-invalid={hasError}
          />
          {hasError && <span className="form-error">{error}</span>}
        </div>
      );

    case "boolean":
      return (
        <div className={`form-group checkbox ${hasError ? "has-error" : ""}`}>
          <label htmlFor={name}>
            <input
              id={name}
              type="checkbox"
              name={name}
              checked={value as boolean}
              onChange={handleChange}
              required={isRequired}
              className="form-checkbox"
              aria-invalid={hasError}
            />
            {capitalize(name)}
            {isRequired && <span className="required">*</span>}
          </label>
          {hasError && <span className="form-error">{error}</span>}
        </div>
      );

    default:
      return <div>Unsupported field type</div>;
  }
};

export default DynamicField;
