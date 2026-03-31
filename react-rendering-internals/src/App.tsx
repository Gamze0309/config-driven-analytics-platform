import { useMemo, useState } from 'react'
import './App.css'

import { ChartPanel } from './components/ChartPanel'
import { FilterPanel } from './components/FilterPanel'
import { KpiPanel } from './components/KpiPanel'
import { ListPanel } from './components/ListPanel'
import { PageHeader } from './components/PageHeader'
import type { RowItem } from './components/types'
import { ALL_ITEMS } from './data/items'

function App() {
  const [query, setQuery] = useState('')

  const rows = useMemo<RowItem[]>(() => ALL_ITEMS, [])

  const visibleRows = rows.filter((row) =>
    row.label.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="page">
      <PageHeader
        title="React Rendering Internals"
        subtitle="Step 2.2: Data generation (10,000 items)"
      />

      <main className="grid">
        <FilterPanel query={query} onQueryChange={setQuery} />
        <KpiPanel />
        <ChartPanel />
        <ListPanel rows={visibleRows} />
      </main>
    </div>
  )
}

export default App
