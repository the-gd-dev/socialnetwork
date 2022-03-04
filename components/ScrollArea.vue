<template>
  <div
    :class="`scroll-area flex flex-col ${customClasses}`"
    :style="{
      maxHeight: maxHeight + unit,
      ...overflowOrientation,
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScrollArea",
  props: {
    customClasses: { default: "" },
    maxHeight: { default: 400 },
    minHeight: { default: 400 },
    unit: { default: "px" },
    direction: { default: "V" },
  },
  computed: {
    overflowOrientation() {
      return this.direction === "V"
        ? { "overflow-y": "auto" }
        : { "overflow-x": "auto" };
    },
  },
};
</script>

<style>
.scroll-area::-webkit-scrollbar {
  width: 5px;
}
.scroll-area::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.scroll-area::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>
