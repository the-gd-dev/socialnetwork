<template>
  <div
    id="caoruselPostPhotos"
    class="carousel slide relative"
    data-bs-ride="carousel"
  >
    <div
      v-if="!disabledPostLink"
      class="carousel-inner relative w-full h-full"
      :style="`height: ${height}px`"
    >
      <nuxt-link :to="`posts/${postId}`">
        <div
          v-for="(photo, pk) in items"
          :key="photo.id"
          :class="current_photo == pk ? 'active' : ''"
          class="carousel-item relative float-left w-full h-full overflow-hidden"
        >
          <img
            :src="photo.url"
            @load="imageLoadingCompleted(pk)"
            class="block w-full"
            alt="..."
          />
        </div>
      </nuxt-link>
    </div>
    <div
      v-else
      class="carousel-inner relative w-full h-full  overflow-hidden"
      :style="`height: ${height}px`"
    >
      <div
        v-for="(photo, pk) in items"
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
      v-if="items.length > 1"
      class="carousel-controls relative w-full z-5 top-0 bottom-0 flex items-center justify-between p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0 right-0"
    >
      <button
        @click="carouselControlPrev"
        class="carousel-control-prev"
        type="button"
        :style="`margin-top: ${marginTop}%`"
        data-bs-target="#caoruselPostPhotos"
        data-bs-slide="prev"
      >
        <Icon name="angle-left" />
      </button>
      <button
        @click="carouselControlNext"
        class="carousel-control-next"
        type="button"
        :style="`margin-top: ${marginTop}%`"
        data-bs-target="#caoruselPostPhotos"
        data-bs-slide="next"
      >
        <Icon name="angle-right" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    postId: { default: "" },
    items: { default: [] },
    marginTop: { default: "-33" },
    height : {default : '300'}
  },
  data() {
    return {
      current_photo: 0,
      disabledPostLink: false,
    };
  },
  created() {
    this.disabledPostLink = this.$route.fullPath === `/posts/${this.postId}`;
  },
  methods: {
    carouselControlNext() {
      if (this.current_photo === this.items.length - 1) {
        this.current_photo = 0;
      } else {
        this.current_photo += 1;
      }
    },
    carouselControlPrev() {
      if (this.current_photo === 0) {
        this.current_photo = this.items.length - 1;
      } else {
        this.current_photo -= 1;
      }
    },
    imageLoadingCompleted(key) {
      this.items[key].loading = false;
    },
  },
};
</script>
<style scoped>
.disabledPostLink {
  pointer-events: none !important;
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
  width: 100%;
}

.post-content .image.loaded {
  filter: blur(0px);
}
.post-content .image {
  /* filter: blur(10px); */
  transition: all ease-in-out 0.3s;
}

#caoruselPostPhotos .carousel-control-prev {
  transform: translateX(-55px);
}
#caoruselPostPhotos .carousel-control-next {
  transform: translateX(55px);
}
.carousel-controls:hover .carousel-control-prev,
.carousel-controls:hover .carousel-control-next,
.carousel-inner:hover + .carousel-controls .carousel-control-prev,
.carousel-inner:hover + .carousel-controls .carousel-control-next {
  transform: translateX(0) !important;
}
</style>
