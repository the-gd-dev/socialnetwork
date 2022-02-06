<template>
  <div class="flex justify-center">
    <div :class="`overlay ${overlay ? 'show' : ''}`"></div>
    <div class="xl:mx-4">
      <Navbar :auth="true" />
      <div class="flex relative">
        <div class="xl:w-64 hidden xl:inline-block"><Sidebar /></div>
        <div class="w-full" @click="containerClickHandler">
          <Nuxt />
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
};
</script>
<style>
  body.overlay-opened{
    overflow: hidden;
  }
</style>
<style scoped>
.overlay.show {
  display: flex;
  z-index: 900;
}
.overlay {
  position: fixed;
  display: none;
  align-items: center;
  justify-items: center;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
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
