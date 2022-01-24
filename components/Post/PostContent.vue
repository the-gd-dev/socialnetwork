<template>
  <div
    class="post-content cursor-pointer flex items-center justify-center overflow-hidden"
  >
    <div class="m-auto" v-if="post.photo.loading">
      <spinner spinnerSize="spinner-2xl" />
    </div>
    <img
      :src="post.photo.url"
      @load="post.photo.loading = false"
      alt=""
      srcset=""
      :class="`image ${post.photo.loading ? '' : 'loaded'}`"
    />
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
  min-height: 400px;
}

.post-content .image.loaded {
  filter: blur(0px);
}
.post-content .image {
  filter: blur(10px);
  transition: all ease-in-out 0.3s;
}
</style>
