<template>
  <nuxt-link
    v-if="pageURI"
    :to="pageURI"
    class="text-blue-700 hover:bg-gray-100 flex items-center justify-center space-x-2 py-1 px-2"
  >
    <Icon :name="pageIcon" :size="pageIconSize" />
    <div v-if="pageLabel" class="hidden md:inline text-lg font-semibold">
      {{ pageLabel }}
    </div>
  </nuxt-link>
  <button
    @click="$emit('on-click')"
    v-else
    class="text-blue-700 hover:bg-gray-100 flex items-center justify-center space-x-2 py-1 px-2"
  >
    <Icon :name="pageIcon" :size="pageIconSize" />
    <div v-if="pageLabel" class="hidden md:inline text-lg font-semibold">
      {{ pageLabel }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    pageURI: {
      default: null,
    },
    pageLabel: {
      default: "",
    },
    pageIcon: {
      default: "",
    },
    pageIconSize: {
      default: "",
    },
  },
};
</script>

<style></style>
