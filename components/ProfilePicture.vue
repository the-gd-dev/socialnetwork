<template>
  <keep-alive>
    <div :class="`flex overflow-hidden h-${size} w-${size}`">
      <div class="m-auto" v-if="loading">
        <spinner spinnerSize="spinner-md" />
      </div>
      <div :class="`w-full h-full ${loading ? 'hidden' : ''}`">
        <nuxt-link :to="`/${userId}`" v-if="linkToProfile">
          <img
            :src="url"
            :alt="userId"
            @load="$emit('loading-complete')"
            class="w-full h-full rounded-full items-center border-2 border-gray-400 object-cover"
          />
        </nuxt-link>
        <div v-else class="w-full h-full ">
          <img
            :src="url"
            :alt="userId"
            @load="$emit('loading-complete')"
            class="w-full h-full rounded-full items-center border-2 border-gray-400 object-cover"
          />
        </div>
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
