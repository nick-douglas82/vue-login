<script setup lang="ts">
import { checkAuth } from "./lib/api";
import { useUserStore, useTransactionStore } from "./store";

const userStore = useUserStore();
const transactionStore = useTransactionStore();

// Check if user is logged in
checkAuth();
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center h-full transition-opacity bg-gray-500 bg-opacity-90" v-if="transactionStore.getIsloading">
    <svg class="mr-3 -ml-1 text-white w-14 h-14 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </div>
  <router-view :key="$route.path" />
</template>
