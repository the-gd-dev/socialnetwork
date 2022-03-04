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
    <div class="flex w-full h-full flex-col" v-else-if="postData.photos.length > 0">
      <div class="bg-gray-100 flex w-full p-4" v-if="postData.text">
        <div class="text-lg text-gray-800 text-center">
          {{ postData.text }}
        </div>
      </div>
      <div
        id="carouselExampleCaptions"
        class="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner relative w-full h-full overflow-hidden post-content-img">
          <div
            v-for="(photo, pk) in postData.photos"
            :key="photo.id"
            :class="current_photo == pk ? 'active' : ''"
            class="carousel-item relative float-left w-full h-full"
          >
            <img
              :src="photo.url"
              @load="imageLoadingCompleted(pk)"
              class="block w-full"
              alt="..."
            />
          </div>
        </div>
        <div
          class="absolute w-full top-0 bottom-0 flex items-center justify-between p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0 right-0"
        >
          <button
            @click="carouselControlPrev"
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <Icon name="angle-left" />
          </button>
          <button
            @click="carouselControlNext"
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <Icon name="angle-right" />
          </button>
        </div>
      </div>
    </div>
    <div v-else class="bg-gray-100 post-content flex w-full px-4"></div>
  </div>
</template>

<script>
export default {
  name: "PostContent",
  props: ["post"],
  data() {
    return { current_photo: 0 };
  },
  computed: {
    postData() {
      this.post.photos.map((photo) => (photo.loading = true));
      return this.post;
    },
  },
  methods: {
    carouselControlNext() {
      if(this.current_photo === this.postData.photos.length - 1){
        this.current_photo = 0;
      }else{
        this.current_photo += 1;
      }
    },
    carouselControlPrev() {
        if(this.current_photo === 0){
          this.current_photo = this.postData.photos.length - 1;
        }else{
          this.current_photo -= 1;
        }
    },
    imageLoadingCompleted(key) {
      this.postData.photos[key].loading = false;
    },
  },
};
</script>

<style scoped>
.carousel-inner {
}
.carousel-item {
  display: none;
}
.carousel-item.active {
  display: inline;
}
.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: rgba(255, 255, 255, 0.349);
  color: black;
}
.carousel-control-prev,
.carousel-control-next {
  font-size: 1.8rem;
  margin: auto 0;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 4px 18px;
  color: white;
  transition: all ease-in-out 0.4s;
}
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
