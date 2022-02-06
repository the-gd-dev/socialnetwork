<template>
  <div class="flex">
    <div class="reacted">
      <button
        :class="`flex items-center ${
          selectedReaction.selected
            ? selectedReaction.customClass
            : 'text-gray-600'
        }`"
      >
        <icon
          :name="selectedReaction.name"
          :size="size"
          :customClass="
            selectedReaction.selected ? selectedReaction.customClass : ''
          "
        />
        &nbsp;&nbsp;
        <span class="text-sm font-semibold"> {{ selectedReaction.label }}</span>
      </button>
      <div class="reactions bg-white rounded-full px-2">
        <div v-if="loading" class="flex items-center space-x-2">
          <div class="animate-pulse flex items-center space-x-2 py-1">
            <div class="rounded-full bg-yellow-400 h-8 w-8 reaction"></div>
            <div class="rounded-full bg-red-400 h-8 w-8 reaction"></div>
            <div class="rounded-full bg-gray-400 h-8 w-8 reaction"></div>
            <div class="rounded-full bg-rose-400 h-8 w-8 reaction"></div>
            <div class="rounded-full bg-blue-400 h-8 w-8 reaction"></div>
          </div>
        </div>
        <div v-else class="flex space-x-2 items-center">
          <button
            class="reaction"
            v-for="reaction in reactionList"
            :key="reaction._id"
            @click="selectReactionHandler(reaction)"
          >
            <div class="flex items-center h-10">
              <icon
                :name="reaction.name"
                :size="size"
                :customClass="reaction.customClass + ' rxn-icon'"
              />
              <span class="text-sm font-semibold reaction-title">
                {{ reaction.label }}</span
              >
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: { default: "24px" },
  },
  data() {
    return {
      loading: false,
      selectedReaction: {
        _id: 1,
        selected: false,
        name: "face-smile",
        customClass: "text-yellow-500",
        gradientClass: "bg-gradient-to-tr from-yellow-200 to-yellow-100",
        label: "Happy",
      },
      reactionList: [],
    };
  },
  async created() {
    this.loading = true;
    this.reactionList = this.$store.state.utility.reactions;
    this.loading = false;
  },
  methods: {
    selectReactionHandler(rxn) {
      this.reactionList.map((r) => {
        if (r._id === rxn._id) r.selected = !r.selected;
        else r.selected = false;
      });
      this.selectedReaction = rxn;
    },
  },
};
</script>

<style scoped>
.reacted {
  position: relative;
}

.reactions {
  position: absolute;
  top: -35px;
  opacity: 0;
  z-index: -1;
  /* max-height: 0; */
  transition: all ease-in-out 0.3s;
}
.reacted:hover .reactions {
  opacity: 1;
  z-index: 99;
  top: -45px;
}
.reaction {
  position: relative;
  top: 0;
  transition: all ease-in-out 0.3s;
}

.reaction .reaction-title,
.reaction .rxn-icon {
  transition: all ease-in-out 0.3s;
}
.reaction:hover .reaction-title {
  width: 100%;
  padding-left: 8px;
}
.reaction .reaction-title {
  width: 0px;
  overflow: hidden;
}
</style>
