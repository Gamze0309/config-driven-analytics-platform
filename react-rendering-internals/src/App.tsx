import { useCallback, useMemo, useState } from 'react'
import './App.css'

import { ChartPanel } from './components/ChartPanel'
import { FilterPanel } from './components/FilterPanel'
import { KpiPanel } from './components/KpiPanel'
import { ListPanel } from './components/ListPanel'
import { PageHeader } from './components/PageHeader'
import { ALL_ITEMS } from './data/items'

function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value)
  }, [])

  const handleSelectRow = useCallback((id: string) => {
    setSelectedId(id)
  }, [])

  const visibleRows = useMemo(() => {
    const normalized = query.toLowerCase()
    return ALL_ITEMS.filter((row) =>
      row.label.toLowerCase().includes(normalized),
    )
  }, [query])

  const kpis = useMemo(() => {
    let total = 0
    let max = -Infinity
    for (const row of visibleRows) {
      total += row.value
      if (row.value > max) max = row.value
    }
    if (visibleRows.length === 0) max = 0

    return {
      total,
      max,
      visible: visibleRows.length,
    }
  }, [visibleRows])

  const buckets = useMemo(() => {
    const buckets = new Array<number>(10).fill(0)
    for (const row of visibleRows) {
      buckets[row.group]++
    }
    return buckets
  }, [visibleRows])

  return (
    <div className="page">
      <PageHeader
        title="React Rendering Internals"
        subtitle="Step 3.4: React.memo for render skipping"
      />

      <main className="grid">
        <FilterPanel query={query} onQueryChange={handleQueryChange} />
        <KpiPanel
          visible={kpis.visible}
          total={kpis.total}
          max={kpis.max}
          selected={selectedId ?? '—'}
        />
        <ChartPanel buckets={buckets} />
        <ListPanel
          rows={visibleRows}
          selectedId={selectedId}
          onSelectRow={handleSelectRow}
        />
      </main>
    </div>
  )
}

export default App
