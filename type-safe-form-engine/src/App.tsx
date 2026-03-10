import { useState } from "react";
import "./App.css";
import SchemaSelector from "./components/SchemaSelector";
import DynamicForm from "./components/DynamicForm";
import TypePreview from "./components/TypePreview";
import {
  PREDEFINED_SCHEMAS,
  type PredefinedSchemaKey,
} from "./schema/predefined";

function App() {
  const [selectedSchemaKey, setSelectedSchemaKey] =
    useState<PredefinedSchemaKey>("userProfile");
  const selectedSchema = PREDEFINED_SCHEMAS[selectedSchemaKey];

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Type-Safe Form Engine</h1>
        <p>Dynamic JSON Schema → Auto-Typed Form Values</p>
      </header>

      <div className="app-layout">
        <div className="panel left-panel">
          <SchemaSelector onSelect={setSelectedSchemaKey} />
        </div>

        <div className="panel middle-panel">
          <h2>Generated Form</h2>
          <DynamicForm
            key={selectedSchemaKey}
            schema={selectedSchema}
            onSubmit={(values) => {
              console.log("✅ Form submitted:", values);
              alert(`Submitted: ${JSON.stringify(values, null, 2)}`);
            }}
          />
        </div>

        <div className="panel right-panel">
          <TypePreview schemaKey={selectedSchemaKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
