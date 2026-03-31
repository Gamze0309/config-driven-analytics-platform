export function ChartPanel() {
  return (
    <section className="panel">
      <h2 className="panelTitle">Chart area</h2>
      <div className="chart">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="bar">
            <div className="barLabel">G{i}</div>
            <div className="barValue">—</div>
          </div>
        ))}
      </div>
      <p className="hint">Placeholder only (no real aggregation yet).</p>
    </section>
  )
}
