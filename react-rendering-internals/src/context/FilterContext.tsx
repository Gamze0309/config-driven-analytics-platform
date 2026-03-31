import { createContext, useContext, useMemo, type ReactNode } from 'react'

type FilterContextValue = {
  query: string
  setQuery: (value: string) => void
}

const FilterContext = createContext<FilterContextValue | null>(null)

export function FilterProvider({
  query,
  setQuery,
  children,
}: {
  query: string
  setQuery: (value: string) => void
  children: ReactNode
}) {
  const value = useMemo(() => ({ query, setQuery }), [query, setQuery])
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilter() {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error('useFilter must be used within <FilterProvider>.')
  return ctx
}
