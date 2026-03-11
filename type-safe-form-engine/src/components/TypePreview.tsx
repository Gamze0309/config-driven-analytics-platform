import { type FC } from "react";
import type { PredefinedSchemaKey } from "../schema/predefined";
import { getPredefinedTypePreview } from "../utils/typeInference";
import { getValidationRulesText } from "../utils/validationBuilder";

interface TypePreviewProps {
  schemaKey: PredefinedSchemaKey;
}

const TypePreview: FC<TypePreviewProps> = ({ schemaKey }) => {
  const { type, handler } = getPredefinedTypePreview(schemaKey);
  const validationRules = getValidationRulesText(schemaKey);

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
        <h3>✓ Validation Rules</h3>
        <pre className="validation-rules-text">
          <code>{validationRules}</code>
        </pre>
      </div>
    </div>
  );
};

export default TypePreview;
