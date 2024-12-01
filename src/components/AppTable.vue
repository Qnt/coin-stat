<template>
  <table>
    <AppTableHeader
      :titles="titles"
      :sort-and-filter-data="sortAndFilterData"
      :cur-sort-title="curSortTitle"
      @sort="sort"
    />
    <tbody>
      <AppTableRow v-for="item in tableData" :key="item.id" :table-item="item" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import AppTableHeader from './AppTableHeader.vue'
import { computed, ref } from 'vue'
import AppTableRow from './AppTableRow.vue'
import type { sortAndFilter, Coin } from '@/types'

const { rawTableData } = defineProps<{ rawTableData: Coin[] }>()
const sortAndFilterData = ref<sortAndFilter>({})
const curSortTitle = ref<keyof Coin | null>(null)

const titles = computed(() => {
  return Object.keys(rawTableData[0]) as Array<keyof Coin>
})

const tableData = computed(() => {
  return [...rawTableData].sort((a, b) => {
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
