import { createContext, useContext, useMemo, type ReactNode } from 'react'

type SelectionContextValue = {
  selectedId: string | null
  selectById: (id: string) => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function SelectionProvider({
  selectedId,
  selectById,
  children,
}: {
  selectedId: string | null
  selectById: (id: string) => void
  children: ReactNode
}) {
  const value = useMemo(
    () => ({ selectedId, selectById }),
    [selectedId, selectById],
  )
  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx)
    throw new Error('useSelection must be used within <SelectionProvider>.')
  return ctx
}
