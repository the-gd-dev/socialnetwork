<template>
  <div class="flex space-x-4" v-if="owner">
    <div class="my-auto border px-2 rounded-xl" >
      <privacy
        :selected="privacyID"
        :toggle="showPopup"
        @toggle-privacy="togglePrivacyHandler"
        @set-privacy="setPrivacyHandler"
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
  props: ["owner", "privacyID"],
  components: { Privacy },
  name: "PostOptions",
  data() {
    return {
      showPopup: false,
    };
  },
  methods: {
    setPrivacyHandler(v) {
      this.togglePrivacyHandler();
      this.$emit("privacy", v);
    },
    togglePrivacyHandler() {
      this.showPopup = !this.showPopup;
    },
  },
};
</script>
<style>
.privacy-options .drop-popup {
  margin-top: -20px;
}
</style>
