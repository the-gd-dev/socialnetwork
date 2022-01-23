<template>
  <div class="flex justify-center">
    <div class="container mx-auto">
      <Navbar :auth="true" />
      <div class="flex">
        <div class="md:w-1/5 hidden md:inline-block"><Sidebar /></div>
        <div class="w-full md:w-4/5" @click="containerClickHandler"><Nuxt /></div>
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
