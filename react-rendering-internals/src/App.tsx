import { useState } from 'react'
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

  const visibleRows = ALL_ITEMS.filter((row) =>
    row.label.toLowerCase().includes(query.toLowerCase()),
  )

  let total = 0
  let max = -Infinity
  for (const row of visibleRows) {
    total += row.value
    if (row.value > max) max = row.value
  }
  if (visibleRows.length === 0) max = 0

  const buckets = new Array<number>(10).fill(0)
  for (const row of visibleRows) {
    buckets[row.group]++
  }

  return (
    <div className="page">
      <PageHeader
        title="React Rendering Internals"
        subtitle="Step 2.3: Baseline anti-patterns (re-render heavy)"
      />

      <main className="grid">
        <FilterPanel query={query} onQueryChange={(value) => setQuery(value)} />
        <KpiPanel
          visible={visibleRows.length}
          total={total}
          max={max}
          selected={selectedId ?? '—'}
        />
        <ChartPanel buckets={buckets} />
        <ListPanel
          rows={visibleRows}
          selectedId={selectedId}
          onSelectRow={(id) => setSelectedId(id)}
        />
      </main>
    </div>
  )
}

export default App
