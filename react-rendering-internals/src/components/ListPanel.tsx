import type { RowItem } from './types'
import { expensiveLabelWork } from '../utils/expensive'

type ListPanelProps = {
  rows: RowItem[]
  selectedId: string | null
  onSelectRow: (id: string) => void
}

export function ListPanel({ rows, selectedId, onSelectRow }: ListPanelProps) {
  return (
    <section className="panel listPanel">
      <h2 className="panelTitle">Large data list</h2>
      <div className="list">
        {rows.map((row) => (
          <div
            key={row.id}
            className={selectedId === row.id ? 'row selected' : 'row'}
            onClick={() => onSelectRow(row.id)}
          >
            <div className="rowTitle">{expensiveLabelWork(row.label)}</div>
            <div className="rowMeta">
              value={row.value} group={row.group}
            </div>
          </div>
        ))}
      </div>
      <p className="hint">
        Step 3.1: stable key ({'row.id'}). Rendering {rows.length} rows.
      </p>
    </section>
  )
}
