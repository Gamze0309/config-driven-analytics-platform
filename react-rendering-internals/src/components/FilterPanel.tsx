import { memo } from 'react'
import { useFilter } from '../context/FilterContext'

export const FilterPanel = memo(function FilterPanel() {
  const { query, setQuery } = useFilter()

  return (
    <section className="panel">
      <h2 className="panelTitle">Filter bar</h2>
      <label className="field">
        <span className="fieldLabel">Search</span>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type here (profiling scenario will use 10 chars)"
        />
      </label>
      <p className="hint">Current query: {query || '—'}</p>
    </section>
  )
})
