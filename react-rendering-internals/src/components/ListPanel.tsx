import type { RowItem } from './types'

type ListPanelProps = {
  rows: RowItem[]
}

export function ListPanel({ rows }: ListPanelProps) {
  return (
    <section className="panel listPanel">
      <h2 className="panelTitle">Large data list</h2>
      <div className="list">
        {rows.map((row) => (
          <div key={row.id} className="row">
            <div className="rowTitle">{row.label}</div>
            <div className="rowMeta">
              value={row.value} group={row.group}
            </div>
          </div>
        ))}
      </div>
      <p className="hint">Step 2.2 will replace these with 10,000 generated items.</p>
    </section>
  )
}
