import { useState } from "react";
import "./App.css";
import SchemaSelector from "./components/SchemaSelector";
import DynamicForm from "./components/DynamicForm";
import TypePreview from "./components/TypePreview";
import SubmitResult from "./components/SubmitResult";
import {
  PREDEFINED_SCHEMAS,
  createSubmissionState,
  type PredefinedSchemaKey,
  type PredefinedSubmissionState,
} from "./schema/predefined";

function App() {
  const [selectedSchemaKey, setSelectedSchemaKey] =
    useState<PredefinedSchemaKey>("userProfile");
  const [lastSubmitted, setLastSubmitted] =
    useState<PredefinedSubmissionState | null>(null);
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
              setLastSubmitted(
                createSubmissionState(selectedSchemaKey, values),
              );
            }}
          />
          <SubmitResult lastSubmitted={lastSubmitted} />
        </div>

        <div className="panel right-panel">
          <TypePreview schemaKey={selectedSchemaKey} />
        </div>
      </div>
    </div>
  );
}

export default App;
