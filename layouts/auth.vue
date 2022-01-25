<template>
  <div class="flex justify-center">
    <div class="container mx-auto">
      <Navbar :auth="true" />
      <div class="flex">
        <div class="lg:w-1/5 hidden lg:inline-block"><Sidebar /></div>
        <div class="w-full lg:w-4/5" @click="containerClickHandler">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { globalEvent } from "@/helpers/globalEvent";
export default {
  methods: {
    containerClickHandler() {
      globalEvent.$emit("container-clicked");
    },
  },
};
</script>
<style>
  .modal-opened {
    overflow:hidden !important;
  }
</style>
