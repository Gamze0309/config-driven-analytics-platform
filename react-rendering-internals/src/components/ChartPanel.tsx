import { memo } from 'react'

type ChartPanelProps = {
  buckets: number[]
}

export const ChartPanel = memo(function ChartPanel({
  buckets,
}: ChartPanelProps) {
  return (
    <section className="panel">
      <h2 className="panelTitle">Chart area</h2>
      <div className="chart">
        {buckets.map((count, i) => (
          <div key={i} className="bar">
            <div className="barLabel">G{i}</div>
            <div className="barValue">{count}</div>
          </div>
        ))}
      </div>
      <p className="hint">Step 3.2: buckets memoized.</p>
    </section>
  )
})
