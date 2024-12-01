import { ref, type Ref } from 'vue'

type useFetchReturn<T> = {
  returnData: Ref<T | null>
  error: Ref<unknown>
  isFetching: Readonly<Ref<boolean>>
}

export default function useFetch<T>(url: string): useFetchReturn<T> {
  const returnData = ref<T | null>(null) as Ref<T | null>
  const error = ref<unknown>(null)
  const isFetching = ref(false)

  isFetching.value = true
  fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then((data) => (returnData.value = data))
    .catch((err) => (error.value = err))
    .finally(() => (isFetching.value = false))
  return { returnData, error, isFetching }
}
