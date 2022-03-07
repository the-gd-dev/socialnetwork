<template>
  <button
    @click="$emit('on-click')"
    :class="`flex items-center md:space-x-2 justify-center h-10 w-10 md:w-auto md:px-4 ${customClass} text-lg text-left inline rounded-full`"
  >
    <Icon :name="icon" />
    <span class="hidden md:inline">{{ title }}</span>
  </button>
</template>

<script>
export default { name: "HeaderBtn", props: ["title", "icon", "customClass"] };
</script>

<style></style>
