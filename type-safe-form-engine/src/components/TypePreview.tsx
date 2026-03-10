import { type FC } from "react";
import type { PredefinedSchemaKey } from "../schema/predefined";
import { getPredefinedTypePreview } from "../utils/typeInference";

interface TypePreviewProps {
  schemaKey: PredefinedSchemaKey;
}

const TypePreview: FC<TypePreviewProps> = ({ schemaKey }) => {
  const { type, handler } = getPredefinedTypePreview(schemaKey);

  return (
    <div className="type-preview-wrapper">
      <div className="type-section">
        <h3>📋 Inferred Type (Compile-time: PredefinedSchemaTypes)</h3>
        <pre>
          <code>{type}</code>
        </pre>
      </div>

      <div className="handler-section">
        <h3>📤 Submit Handler</h3>
        <pre>
          <code>{handler}</code>
        </pre>
      </div>

      <div className="info-section">
        <h3>ℹ️ Type Safety</h3>
        <ul>
          <li>✅ Inferred from schema at compile-time</li>
          <li>✅ Required fields are mandatory</li>
          <li>✅ Optional fields marked with ?</li>
        </ul>
      </div>
    </div>
  );
};

export default TypePreview;
