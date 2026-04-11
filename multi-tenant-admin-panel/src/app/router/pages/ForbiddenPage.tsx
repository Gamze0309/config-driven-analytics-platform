import type { FeatureKey } from '../../../core/flags/types';
import type { Permission } from '../../../core/auth/types';

export function ForbiddenPage(props: {
  missingPermissions?: Permission[];
  missingFlags?: FeatureKey[];
}) {
  const missingPermissions = props.missingPermissions ?? [];
  const missingFlags = props.missingFlags ?? [];

  return (
    <section className="card" aria-label="Access denied">
      <h2 className="cardTitle">403 — Forbidden</h2>
      <p>You don’t have access to this page.</p>

      {(missingPermissions.length > 0 || missingFlags.length > 0) && (
        <div className="kv" style={{ marginTop: 12 }}>
          {missingPermissions.length > 0 && (
            <div className="kvRow">
              <div className="kvKey">Missing permissions</div>
              <div className="kvVal">{missingPermissions.join(', ')}</div>
            </div>
          )}
          {missingFlags.length > 0 && (
            <div className="kvRow">
              <div className="kvKey">Missing flags</div>
              <div className="kvVal">{missingFlags.join(', ')}</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
