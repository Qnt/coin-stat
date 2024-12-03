<template>
  <thead>
    <tr>
      <th v-for="({ title, isFilterable }, i) in headerData" :key="`${title}-${i}`">
        <div @click="$emit('sort', title)">{{ title }}</div>
        <input
          v-if="isFilterable"
          :value="sortAndFilterData[title].filterPattern"
          placeholder="filter"
          @input="updateFilterPattern(title, ($event.target as HTMLInputElement).value)"
        />
        <div v-if="title === curSortTitle">
          {{ getSortFlagText(sortAndFilterData[title]?.isAsc) }}
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { Coin, Header, SortAndFilter } from '@/types'

defineProps<{
  headerData: Header<keyof Coin>[]
  curSortTitle: keyof Coin | null
}>()
defineEmits<{
  sort: [title: keyof Coin]
}>()

const [sortAndFilterData, modifiers] = defineModel<SortAndFilter, 'lowercase'>({
  required: true,
})

function updateFilterPattern(title: keyof Coin, pattern: string) {
  if (modifiers.lowercase) {
    sortAndFilterData.value[title].filterPattern = pattern.toLocaleLowerCase()
  } else {
    sortAndFilterData.value[title].filterPattern = pattern
  }
}

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
