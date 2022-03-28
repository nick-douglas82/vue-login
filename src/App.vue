<script setup lang="ts">
import { checkAuth } from "./lib/api";

// Check if user is logged in
checkAuth();
</script>

<template>
  <router-view :key="$route.path" />
</template>
