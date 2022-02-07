<template>
  <div v-if="status" class="w-3 h-3 rounded-full bg-green-500"></div>
  <div v-else class="w-3 h-3 rounded-full bg-gray-400"></div>
</template>

<script>
export default {
  name: "UserStatus",
  props : ['status']
};
</script>

<style></style>
