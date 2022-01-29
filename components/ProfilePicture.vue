<template>
  <keep-alive>
    <div
      :class="`flex overflow-hidden h-${size} w-${size} rounded-full items-center border-2 border-gray-400`"
    >
      <div class="m-auto" v-if="loading">
        <spinner spinnerSize="spinner-lg" />
      </div>
      <nuxt-link :to="`/${userId}`" v-if="linkToProfile">
        <img
          :src="url"
          @load="$emit('loading-complete')"
          class="w-full h-full"
        />
      </nuxt-link>
      <div v-else>
        <img
          :src="url"
          @load="$emit('loading-complete')"
          class="w-full h-full"
        />
      </div>
    </div>
  </keep-alive>
</template>

<script>
export default {
  props: ["name"],
  props: {
    linkToProfile: { default: true },
    userId: { default: "" },
    size: { default: 10 },
    url: { default: "" },
    loading: { default: false },
  },
};
</script>

<style></style>
