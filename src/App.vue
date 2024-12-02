<script setup lang="ts">
import { ref, toValue } from 'vue'
import AppTable from './components/AppTable.vue'
import { useCoins } from './composables/useCoins'
import { type Coin } from './types'

const url = ref(import.meta.env.VITE_API_URL)

const { data } = useCoins(toValue(url))
</script>

<template>
  <div v-if="!data">NO DATA</div>
  <AppTable v-else :raw-table-data="data as Coin[]" />
</template>

<style scoped></style>
