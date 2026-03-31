export function KpiPanel() {
  return (
    <section className="panel">
      <h2 className="panelTitle">KPI cards</h2>
      <div className="kpiGrid">
        <div className="kpiCard">
          <div className="kpiLabel">Visible</div>
          <div className="kpiValue">—</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Total</div>
          <div className="kpiValue">—</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Max</div>
          <div className="kpiValue">—</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Selected</div>
          <div className="kpiValue">—</div>
        </div>
      </div>
    </section>
  )
}
