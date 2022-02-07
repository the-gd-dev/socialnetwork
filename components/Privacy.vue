<template>
  <drop-popup :popup="toggle" class="privacy-options">
    <template #drop-option>
      <button @click="$emit('toggle-privacy')">
        <Icon :name="selected.icon" :type="selected.type" size="16px" />
        <div class="inline">{{ selected.title }}</div>
      </button>
    </template>
    <template #drop-content>
      <div
        class="flex flex-col bg-white text-gray-800 mr-4 w-36 py-1 shadow-md border border-gray-200 rounded-lg"
      >
        <a
          href="#"
          v-for="option in $store.state.utility.privacy"
          :key="option._id"
          class="hover:bg-gray-200 px-2"
          @click="$emit('selected', option)"
        >
          <span class="mr-2"><Icon :name="option.icon" :type="option.type" size="16px" /></span>
          {{ option.title }}
        </a>
      </div>
    </template>
  </drop-popup>
</template>

<script>
import { globalEvent } from "~/helpers/globalEvent";
export default {
  props: ["toggle", "selected"],
  created() {
    // globalEvent.$on("container-clicked", () => {
    //   this.$emit("toggle-privacy", false);
    // });
  },
};
</script>
