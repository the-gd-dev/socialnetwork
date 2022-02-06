<template>
  <div class="flex space-x-4">
    <div class="my-auto post-options">
      <privacy :toggle="showPopup" @toggle-privacy="(v) => (showPopup = v)" />
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
<style scoped>
.post-options{
  margin-top: -340px;
}
</style>
