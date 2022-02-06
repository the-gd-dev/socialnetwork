<template>
  <div class="cursor-pointer flex items-center justify-center overflow-hidden">
    <div
      class="bg-gray-100 post-content flex w-full px-4"
      v-if="post.text && !post.photo"
    >
      <nuxt-link :to="`posts/${post.id}`" class="m-auto">
        <div class="text-3xl text-gray-800 text-center">
          {{ post.text }}
        </div>
      </nuxt-link>
    </div>
    <div v-if="post.photo" class="post-content-img">
      <div class="m-auto absolute z-5" v-if="post.photo.loading">
        <spinner spinnerSize="spinner-2xl" />
        <!-- <span class="text-5xl font-semibold">{{post.id}}</span> -->
      </div>
      <div class="m-auto relative z-1">
        <nuxt-link :to="`posts/${post.id}`">
          <img
            :src="post.photo.url"
            alt=""
            srcset=""
            :class="`image ${post.photo.loading ? '' : 'loaded'}`"
            @load="post.photo.loading = false"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostContent",
  props: ["post"],
};
</script>

<style scoped>
.post-content {
  min-height: 200px;
}
.post-content-img {
  min-height: 400px;
}

.post-content .image.loaded {
  filter: blur(0px);
}
.post-content .image {
  /* filter: blur(10px); */
  transition: all ease-in-out 0.3s;
}
</style>
