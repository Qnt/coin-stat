<template>
  <thead>
    <tr>
      <th v-for="({ title, isFilterable }, i) in headerData" :key="`${title}-${i}`">
        <div @click="$emit('sort', title)">{{ title }}</div>
        <input
          v-if="isFilterable"
          v-model.trim="sortAndFilterData[title].filterPattern"
          placeholder="filter"
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

// TODO: lowercase modifier
const [sortAndFilterData, modelModifiers] = defineModel<SortAndFilter, 'lowercase'>({
  required: true,
  set(value) {
    if (modelModifiers.lowercase) {
      const normalized = {} as SortAndFilter
      Object.keys(value).forEach((key) => {
        const typedKey = key as keyof SortAndFilter
        if (value[typedKey]?.filterPattern) {
          normalized[typedKey] = {
            ...value[typedKey],
            filterPattern: value[typedKey].filterPattern?.toLowerCase(),
          }
        } else {
          normalized[typedKey] = value[typedKey]
        }
      })
      return normalized
    }
    return value
  },
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
