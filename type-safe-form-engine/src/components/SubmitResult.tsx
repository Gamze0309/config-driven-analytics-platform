import type { FC } from "react";
import type { PredefinedSubmissionState } from "../schema/predefined";

interface SubmitResultProps {
  lastSubmitted: PredefinedSubmissionState | null;
}

const SubmitResult: FC<SubmitResultProps> = ({ lastSubmitted }) => {
  if (!lastSubmitted) {
    return (
      <div className="submit-result">
        <h3>📤 Submit Result</h3>
        <p className="no-submission">
          No submission yet. Fill out the form above and click Submit.
        </p>
      </div>
    );
  }

  return (
    <div className="submit-result">
      <h3>✅ Last Submitted Values</h3>
      <div className="result-info">
        <p className="schema-name">
          Schema: <strong>{lastSubmitted.schemaKey}</strong>
        </p>
        <pre className="result-json">
          <code>{JSON.stringify(lastSubmitted.values, null, 2)}</code>
        </pre>
      </div>
      <div className="type-info">
        <p className="verification">✓ Type-safe values received and logged</p>
      </div>
    </div>
  );
};

export default SubmitResult;
