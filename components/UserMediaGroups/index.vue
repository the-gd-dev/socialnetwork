<template>
  <div class="flex flex-col w-full">
    <user-media-group
      :mediaType="mediaGroupType"
      v-for="group in groups"
      :key="group.id"
      :items="group.items"
      :loadingData="loadingData"
      :heading="group.label"
    />
  </div>
</template>

<script>
import UserMediaGroup from "./UserMediaGroup.vue";
export default {
  name:"UserMediaGroups",
  components: { UserMediaGroup },
  props: {
    mediaGroupType:{default : ""},
    groups: { default: [] },
    loadingData: { default: false },
  },
};
</script>

<style></style>
