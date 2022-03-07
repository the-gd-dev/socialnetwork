<template>
  <section id="profile-picture-uploads" v-if="items.length > 0">
    <div class="text-xl font-semibold px-4 py-2 border-b">
      <span class="text-xl text-gray-700"> {{ heading }}</span>
      <span class="text-3xl text-gray-400"> {{ items.length }}</span>
    </div>
    <div class="mt-4">
      <UserMediaItems
        :type="mediaType"
        :trash="true"
        :fetchingData="loadingData"
        :userMediaItems="items"
        :customClasses="mediaItemClasses"
      />
    </div>
  </section>
</template>

<script>
import UserMediaItems from "~/components/UserMediaItems/index.vue";
export default {
  components: { UserMediaItems },
  name: "UserMediaGroup",
  props: {
    mediaType: { default: "" },
    items: { default: [] },
    loadingData: { default: false },
    heading: { default: "" },
  },
  computed : {
    mediaItemClasses () {
      if(this.mediaType === 'videos'){
        return "flex overflow-hidden border w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-lg"
      }else{
        return "flex overflow-hidden w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-lg"
      }
    }
  }
};
</script>

<style></style>
