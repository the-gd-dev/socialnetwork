<template>
  <div
    v-if="!findPeople"
    class="animate-pulse flex space-x-2 items-center py-2 pl-2"
  >
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
  <div v-else class="animate-pulse flex space-x-2 items-center py-2 pl-2">
    <div class="rounded-full bg-gray-400 h-10 w-10"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-2 bg-gray-400 rounded mr-4"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-2 bg-gray-400 rounded col-span-3"></div>
        </div>
      </div>
    </div>
    <div class="flex-1 space-y-2 py-1 pr-5">
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-8 w-14 lg:w-24 xl:w-20 bg-emerald-300 rounded-full col-span-3"></div>
          <div class="h-8 w-14 lg:w-24 xl:w-20 bg-gray-400 rounded-full col-span-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonSkeleton",
  props: {
    findPeople: { default: false },
  },
};
</script>

<style>
</style>
