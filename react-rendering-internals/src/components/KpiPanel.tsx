import { memo } from 'react'
import { useSelection } from '../context/SelectionContext'

type KpiPanelProps = {
  visible: number
  total: number
  max: number
}

export const KpiPanel = memo(function KpiPanel({
  visible,
  total,
  max,
}: KpiPanelProps) {
  const { selectedId } = useSelection()

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
          <div className="kpiValue">{selectedId ?? '—'}</div>
        </div>
      </div>
    </section>
  )
})
