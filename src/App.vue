<script setup lang="ts">
import { ref, toValue } from 'vue'
import useFetch from './composables/useFetch'
import { type ApiResponse } from './types'
import AppTable from './components/AppTable.vue'

const url = ref(import.meta.env.VITE_API_URL)

const { returnData, error, isFetching } = useFetch<ApiResponse>(toValue(url))
</script>

<template>
  <div v-if="!returnData?.data.length">NO DATA</div>
  <AppTable v-else :raw-table-data="returnData.data" />
</template>

<style scoped></style>
