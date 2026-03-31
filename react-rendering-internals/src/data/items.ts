import type { RowItem } from '../components/types'

export const ALL_ITEMS: RowItem[] = Array.from({ length: 10_000 }, (_, index) => {
  const value = (index * 73) % 1000
  const group = index % 10
  return {
    id: `item-${index}`,
    label: `Item ${index}`,
    value,
    group,
  }
})
