import { useState } from "react";
import {
  PREDEFINED_SCHEMAS,
  type PredefinedSchemaKey,
} from "../schema/predefined";
import type { ObjectSchema } from "../types/field";

const SchemaSelector = () => {
  const [selectedSchema, setSelectedSchema] =
    useState<PredefinedSchemaKey>("userProfile");
  const [schema, setSchema] = useState<ObjectSchema>(
    PREDEFINED_SCHEMAS[selectedSchema],
  );

  const handleSchemaSelect = (schemaKey: PredefinedSchemaKey) => {
    setSelectedSchema(schemaKey);
    setSchema(PREDEFINED_SCHEMAS[schemaKey]);
    console.log("Selected schema:", schemaKey);
  };

  return (
    <div className="predefined-mode">
      <h3>Select a Schema:</h3>
      <div className="schema-buttons">
        <button
          className={selectedSchema === "userProfile" ? "active" : ""}
          onClick={() => handleSchemaSelect("userProfile")}
        >
          User Profile
        </button>
        <button
          className={selectedSchema === "contact" ? "active" : ""}
          onClick={() => handleSchemaSelect("contact")}
        >
          Contact Form
        </button>
        <button
          className={selectedSchema === "product" ? "active" : ""}
          onClick={() => handleSchemaSelect("product")}
        >
          Product
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
