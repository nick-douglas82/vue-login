
<script setup lang="ts">
  import { ref } from "vue";
import { useErrorStore } from "../store";
import { XCircleIcon } from '@heroicons/vue/solid'
  
  const errorStore = useErrorStore();
  const errors = ref<Array<string>>([])

  errorStore.$subscribe(() => errors.value = errorStore.errors)
</script>

<template>
  <div v-if="errorStore.hasErrors" class="p-4 mt-5 rounded-md bg-red-50">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="w-5 h-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">There is an error, please correct it and try again</h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="pl-5 space-y-1 list-disc">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>