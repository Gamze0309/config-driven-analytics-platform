type FilterPanelProps = {
  query: string
  onQueryChange: (value: string) => void
}

export function FilterPanel({ query, onQueryChange }: FilterPanelProps) {
  return (
    <section className="panel">
      <h2 className="panelTitle">Filter bar</h2>
      <label className="field">
        <span className="fieldLabel">Search</span>
        <input
          className="input"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Type here (profiling scenario will use 10 chars)"
        />
      </label>
      <p className="hint">Current query: {query || '—'}</p>
    </section>
  )
}
