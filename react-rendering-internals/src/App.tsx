import { useMemo, useState } from 'react'
import './App.css'

import { ChartPanel } from './components/ChartPanel'
import { FilterPanel } from './components/FilterPanel'
import { KpiPanel } from './components/KpiPanel'
import { ListPanel } from './components/ListPanel'
import { PageHeader } from './components/PageHeader'
import type { RowItem } from './components/types'

function App() {
  const [query, setQuery] = useState('')

  const rows = useMemo<RowItem[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: `placeholder-${i}`,
      label: `Row ${i}`,
      value: (i * 73) % 1000,
      group: i % 10,
    }))
  }, [])

  return (
    <div className="page">
      <PageHeader
        title="React Rendering Internals"
        subtitle="Step 2.1: Layout skeleton (Filter / KPI / Chart / List)"
      />

      <main className="grid">
        <FilterPanel query={query} onQueryChange={setQuery} />
        <KpiPanel />
        <ChartPanel />
        <ListPanel rows={rows} />
      </main>
    </div>
  )
}

export default App
