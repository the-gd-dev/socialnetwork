<template>
  <div class="animate-pulse flex space-x-2 items-center py-2 pl-2">
    <div class="rounded-full bg-gray-300 h-10 w-10"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-2 bg-gray-300 rounded mr-4"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-2 bg-gray-300 rounded col-span-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'PersonSkeleton'
};
</script>

<style></style>
