<template>
  <tr>
    <td v-for="(value, i) in coinValues" :key="`${i}-${value}`">{{ value }}</td>
  </tr>
</template>

<script setup lang="ts">
import type { Coin } from '@/types'
import { computed } from 'vue'

const { tableItem } = defineProps<{
  tableItem: Coin
}>()

const coinValues = computed(() => Object.values(tableItem))
</script>

<style scoped>
td {
  padding: 0.5rem;
  border: 1px solid;
}
</style>
