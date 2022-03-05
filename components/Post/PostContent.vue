<template>
  <div class="cursor-pointer flex items-center justify-center overflow-hidden">
    <div
      class="bg-gray-100 post-content flex w-full px-4"
      v-if="postData.text && !postData.photos.length > 0"
    >
      <nuxt-link :to="`posts/${postData.id}`" class="m-auto">
        <div class="text-3xl text-gray-800 text-center">
          {{ postData.text }}
        </div>
      </nuxt-link>
    </div>
    <div
      class="flex w-full h-full flex-col"
      v-else-if="postData.photos.length > 0"
    >
      <div class="bg-white flex w-full py-2 px-2" v-if="postData.text">
        <div class="text-md text-gray-600 text-center">
          {{ postData.text }}
        </div>
      </div>
      <Carousel
        v-if="postData.photos.length"
        :postId="postData.id"
        :items="postData.photos"
      />
    </div>
    <div v-else class="bg-gray-100 post-content flex w-full px-4"></div>
  </div>
</template>

<script>
export default {
  name: "PostContent",
  props: ["post"],
  computed: {
    postData() {
      this.post.photos.map((photo) => (photo.loading = true));
      return this.post;
    },
  },
};
</script>

<style scoped>

.post-content {
  min-height: 200px;
}
.post-content-img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.post-content-img {
  height: 300px;
  width: 100%;
}

.post-content .image.loaded {
  filter: blur(0px);
}
.post-content .image {
  /* filter: blur(10px); */
  transition: all ease-in-out 0.3s;
}
</style>
