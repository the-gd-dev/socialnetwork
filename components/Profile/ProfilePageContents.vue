<template>
  <!-- Selected Tab Span -->
  <div v-if="selectedPage !== ''" class="flex mt-2 flex-col relative">
    <div class="tab-span show p-4"><slot></slot></div>
  </div>
  <div v-else class="flex mt-2 flex-col relative px-2 lg:px-0">
    <slot></slot>
  </div>
  <!-- Selected Tab Span -->
</template>

<script>
export default {
  name: "ProfilePageContents",
  props: ["selectedPage"],
};
</script>

<style></style>
