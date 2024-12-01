<template>
  <thead>
    <tr>
      <th
        v-for="({ title, isAsc }, i) in headerData"
        :key="`${title}-${i}`"
        @click="$emit('sort', title)"
      >
        {{ title }}
        {{ isAsc ? 'Asc' : '' }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { Coin, sortAndFilter } from '@/types'
import { computed } from 'vue'

const { titles, sortAndFilterData } = defineProps<{
  titles: Array<keyof Coin>
  sortAndFilterData: sortAndFilter
}>()
defineEmits<{
  sort: [title: keyof Coin]
}>()

const headerData = computed(() => {
  return titles.map((t) => {
    return {
      title: t,
      isAsc: sortAndFilterData[t]?.isAsc,
      filterPattern: sortAndFilterData[t]?.filterPattern,
    }
  })
})
</script>

<style scoped>
th {
  padding: 0.5rem;
  border: 1px solid;
}
</style>
