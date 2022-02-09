<template>
  <drop-popup :popup="toggle" class="privacy-options">
    <template #drop-option>
      <button @click="$emit('toggle-privacy')" v-if="privacySelected">
        <Icon
          :name="privacySelected.icon"
          :type="privacySelected.type"
          size="16px"
        />
        <div class="inline">{{ privacySelected.title }}</div>
      </button>
    </template>
    <template #drop-content>
      <div
        class="flex flex-col bg-white text-gray-800 mr-4 w-36 py-1 shadow-md border border-gray-200 rounded-lg"
      >
        <a
          href="#"
          v-for="option in privacies"
          :key="option._id"
          class="hover:bg-gray-200 px-2"
          @click="$emit('selected', option)"
        >
          <span class="mr-2"
            ><Icon :name="option.icon" :type="option.type" size="16px"
          /></span>
          {{ option.title }}
        </a>
      </div>
    </template>
  </drop-popup>
</template>

<script>
import api from "~/api";
export default {
  props: { toggle: { default: false }, selected: { default: 1 } },
  data() {
    return {
      privacySelected: {},
      privacies: [],
    };
  },
  async mounted() {
    if (this.$store.state.utility.privacy.length === 0) {
      console.log("zero privacies");
      const response = await api.utils.privacy();
      this.$store.commit("utility/set_privacy", response.data.privacies);
    }
    this.privacies = this.$store.state.utility.privacy;
    this.privacySelected = this.privacies[(this.selected - 1)];
  },
};
</script>
