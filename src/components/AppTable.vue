<template>
  <table>
    <AppTableHeader :titles="titles" :sort-and-filter-data="sortAndFilterData" @sort="sort" />
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

type TableProps = {
  rawTableData: Coin[]
}

const { rawTableData } = defineProps<TableProps>()

const sortAndFilterData = ref<sortAndFilter>({})
const curSortTitle = ref<keyof Coin | null>(null)

const titles = computed(() => {
  return Object.keys(rawTableData[0]) as Array<keyof Coin>
})

function sort(title: keyof Coin) {
  curSortTitle.value = title
}

const tableData = computed(() => {
  return [...rawTableData].sort((a, b) => {
    if (!curSortTitle.value) {
      return 0
    }

    const aValue = a[curSortTitle.value]
    const bValue = b[curSortTitle.value]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue)
    }

    return 0
  })
})
</script>

<style scoped>
table {
  border: 1px solid;
  border-collapse: collapse;
  border-spacing: 1px;
}
</style>
