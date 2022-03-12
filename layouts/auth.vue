<template>
  <div class="flex justify-center">
    <div
      :class="`overlay ${overlay ? 'show' : ''}`"
      @click="toggleNavbar = !toggleNavbar"
    ></div>
    <div class="w-full xl:mx-6">
      <Navbar :auth="true" @toggle-sidebar="toggleNavbar = !toggleNavbar" />
      <div class="flex relative">
        <div class="xl:w-64 xl:inline-block relative">
          <Sidebar :toggle="toggleNavbar" />
        </div>
        <div class="w-full relative sm:px-4" @click="containerClickHandler">
          <Nuxt />
          <notifications />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { globalEvent } from "@/helpers/globalEvent";
export default {
  data() {
    return {
      toggleNavbar: false,
      toggleOverlay: false,
    };
  },
  computed: {
    overlay() {
      return this.toggleOverlay;
    },
  },
  created() {
    globalEvent.$on("overlay", (data) => {
      this.toggleOverlay = data.toggle;
      document.body.classList.remove("overlay-opened");
      if (this.toggleOverlay) {
        document.body.classList.add("overlay-opened");
      }
    });
  },
  methods: {
    containerClickHandler() {
      globalEvent.$emit("container-clicked");
    },
  },
  beforeDestroy() {
    globalEvent.$off("overlay");
    globalEvent.$off("container-clicked");
  },
  watch: {
    $route() {
      if(this.toggleNavbar){
        this.toggleNavbar = !this.toggleNavbar;
      }
    },
  },
};
</script>
<style>
body.overlay-opened {
  overflow: hidden;
}
</style>
<style scoped>
.overlay.show {
  display: flex;
  z-index: 1000;
}
.overlay {
  position: fixed;
  display: none;
  align-items: center;
  justify-items: center;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>
