type KpiPanelProps = {
  visible: number
  total: number
  max: number
  selected: string
}

export function KpiPanel({ visible, total, max, selected }: KpiPanelProps) {
  return (
    <section className="panel">
      <h2 className="panelTitle">KPI cards</h2>
      <div className="kpiGrid">
        <div className="kpiCard">
          <div className="kpiLabel">Visible</div>
          <div className="kpiValue">{visible}</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Total Value</div>
          <div className="kpiValue">{total}</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Max</div>
          <div className="kpiValue">{max}</div>
        </div>
        <div className="kpiCard">
          <div className="kpiLabel">Selected</div>
          <div className="kpiValue">{selected}</div>
        </div>
      </div>
    </section>
  )
}
