// fetch.js
import { ref } from "vue";

export default function useFetch(url: string) {
  const data = ref(null);
  const error = ref(null);
  debugger

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
