<template>
  <table>
    <AppTableHeader
      :header-data="headerData"
      :sort-and-filter-data="sortAndFilterData"
      :cur-sort-title="curSortTitle"
      v-model.lowercase="sortAndFilterData"
      @sort="sort"
    />
    <tbody>
      <AppTableRow v-for="item in tableData" :key="item.id" :table-item="item" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Coin, Header, SortAndFilter } from '@/types'
import { computed, ref, type Ref } from 'vue'
import AppTableHeader from './AppTableHeader.vue'
import AppTableRow from './AppTableRow.vue'

const { rawTableData } = defineProps<{ rawTableData: Coin[] }>()
const curSortTitle = ref<keyof Coin | null>(null)

const sortAndFilterData: Ref<SortAndFilter> = ref(
  Object.keys(rawTableData[0] || {}).reduce((acc, key) => {
    acc[key as keyof Coin] = {}
    return acc
  }, {} as SortAndFilter),
)

const headerData = computed(() => {
  const titles = Object.keys(rawTableData[0]) as Array<keyof Coin>

  return titles.map((title) => {
    return {
      title,
      isFilterable: typeof rawTableData[0][title] === 'string',
    }
  }) as Header<keyof Coin>[]
})

const tableData = computed(() => {
  const sortedTableData = [...rawTableData].sort((a, b) => {
    if (!curSortTitle.value) {
      return 0
    }

    const aValue = a[curSortTitle.value]
    const bValue = b[curSortTitle.value]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortAndFilterData.value[curSortTitle.value]?.isAsc ? aValue - bValue : bValue - aValue
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortAndFilterData.value[curSortTitle.value]?.isAsc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    return 0
  })

  const filterTitles = Object.keys(sortAndFilterData.value).filter(
    (key) => sortAndFilterData.value[key as keyof Coin].filterPattern,
  ) as Array<keyof Coin>

  return sortedTableData.filter((coin) => {
    for (const title of filterTitles as [keyof Coin]) {
      const filterPattern = sortAndFilterData.value[title].filterPattern ?? ''
      if (typeof coin[title] === 'string' && !coin[title].toLowerCase().includes(filterPattern)) {
        return false
      }
    }
    return true
  })
})

function sort(title: keyof Coin) {
  curSortTitle.value = title
  sortAndFilterData.value[curSortTitle.value] = {
    ...sortAndFilterData.value[curSortTitle.value],
    isAsc: !sortAndFilterData.value[curSortTitle.value]?.isAsc,
  }
}
</script>

<style scoped>
table {
  border: 1px solid;
  border-collapse: collapse;
  border-spacing: 1px;
}
</style>
