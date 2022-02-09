<template>
  <div class="flex space-x-4">
    <div class="my-auto">
      <privacy
        :toggle="showPopup"
        @toggle-privacy="(v) => (showPopup = !showPopup)"
      />
    </div>
    <button @click="$emit('delete')">
      <Icon
        name="trash"
        type="fa"
        size="16px"
        customClass="cursor-pointer text-gray-500 hover:text-gray-800"
      />
    </button>
  </div>
</template>

<script>
import Privacy from "../Privacy.vue";
export default {
  components: { Privacy },
  name: "PostOptions",
  data() {
    return {
      showPopup: false,
    };
  },
};
</script>
<style>
.privacy-options .drop-popup{
  margin-top: -20px;
}
</style>
