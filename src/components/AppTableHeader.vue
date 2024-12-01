<template>
  <thead>
    <tr>
      <th
        v-for="({ title, isAsc }, i) in headerData"
        :key="`${title}-${i}`"
        @click="$emit('sort', title)"
      >
        <div>{{ title }}</div>
        <div v-if="title === curSortTitle">
          {{ getSortFlagText(isAsc) }}
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { Coin, Header, sortAndFilter } from '@/types'
import { computed, type ComputedRef } from 'vue'

const { titles, sortAndFilterData } = defineProps<{
  titles: (keyof Coin)[]
  sortAndFilterData: sortAndFilter
  curSortTitle: keyof Coin | null
}>()
defineEmits<{
  sort: [title: keyof Coin]
}>()

const headerData: ComputedRef<Header<keyof Coin>[]> = computed(() => {
  return titles.map((t) => {
    const { isAsc, filterPattern } = sortAndFilterData[t] ?? {}
    return {
      title: t,
      ...(isAsc !== undefined && { isAsc }),
      ...(filterPattern && { filterPattern }),
    }
  })
})

function getSortFlagText(isAsc?: boolean) {
  if (isAsc === undefined) {
    return ''
  }
  return isAsc ? 'Asc' : 'Desc'
}
</script>

<style scoped>
th {
  padding: 0.5rem;
  border: 1px solid;
}
</style>
