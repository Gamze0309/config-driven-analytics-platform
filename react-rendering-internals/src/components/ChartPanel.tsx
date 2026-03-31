type ChartPanelProps = {
  buckets: number[]
}

export function ChartPanel({ buckets }: ChartPanelProps) {
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
      <p className="hint">Baseline: buckets computed on every render.</p>
    </section>
  )
}
