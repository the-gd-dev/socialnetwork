<template>
  <div :class="`overflow-hidden h-${size} w-${size} rounded-full`">
    <div class="m-auto" v-if="loading">
      <spinner spinnerSize="spinner-lg" />
    </div>
    <nuxt-link :to="`/profiles/${userId}`">
      <img :src="url" @load="$emit('loading-complete')" />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["name"],
  props: {
    userId: { default: "" },
    size: { default: 10 },
    url: { default: "" },
    loading: { default: false },
  },
};
</script>

<style></style>
