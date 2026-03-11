import { useState } from "react";
import {
  PREDEFINED_SCHEMAS,
  type PredefinedSchemaKey,
} from "../schema/predefined";

interface SchemaSelectorProps {
  onSelect?: (schemaKey: PredefinedSchemaKey) => void;
}

const SchemaSelector = ({ onSelect }: SchemaSelectorProps) => {
  const [selectedSchema, setSelectedSchema] =
    useState<PredefinedSchemaKey>("userProfile");
  const schema = PREDEFINED_SCHEMAS[selectedSchema];

  const handleSchemaSelect = (schemaKey: PredefinedSchemaKey) => {
    setSelectedSchema(schemaKey);
    onSelect?.(schemaKey);
  };

  return (
    <div className="predefined-mode">
      <h3>Select a Schema:</h3>
      <div className="schema-buttons">
        <button
          type="button"
          className={selectedSchema === "userProfile" ? "active" : ""}
          onClick={() => handleSchemaSelect("userProfile")}
        >
          User Profile
        </button>
        <button
          type="button"
          className={selectedSchema === "contact" ? "active" : ""}
          onClick={() => handleSchemaSelect("contact")}
        >
          Contact Form
        </button>
        <button
          type="button"
          className={selectedSchema === "product" ? "active" : ""}
          onClick={() => handleSchemaSelect("product")}
        >
          Product
        </button>
        <button
          type="button"
          className={selectedSchema === "userWithAddress" ? "active" : ""}
          onClick={() => handleSchemaSelect("userWithAddress")}
        >
          User (with Address)
        </button>
        <button
          type="button"
          className={selectedSchema === "survey" ? "active" : ""}
          onClick={() => handleSchemaSelect("survey")}
        >
          Survey (Conditional)
        </button>
      </div>

      {schema && (
        <div className="schema-display">
          <h3>Selected Schema: {selectedSchema}</h3>
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SchemaSelector;
