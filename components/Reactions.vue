<template>
  <div class="flex">
    <div class="reacted">
      <button
        :class="`flex justify-center items-center ${
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
        &nbsp;
        <span class="text-sm font-semibold md:hidden lg:inline"> {{ selectedReaction.label }}</span>
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
            :key="reaction.id"
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
import api from "~/api";
export default {
  props: {
    size: { default: "24px" },
    selected: { default: null },
  },
  data() {
    return {
      loading: false,
      selectedReaction: {
        id: 1,
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
    var rxns = this.$store.getters["utility/getReactions"].slice();
    if (rxns.length === 0) {
      try {
        const response = await api.utils.reactions();
        rxns = response.data.reactions.slice();
        this.$store.commit("utility/set_reactions", rxns);
      } catch (error) {}
    }
    this.reactionList = rxns;
    if (this.selected) {
      this.selectedReaction = this.selected;
      this.selectedReaction.selected = true;
    }
    this.loading = false;
  },
  methods: {
    selectReactionHandler(rxn) {
      this.selectedReaction = rxn;
      this.$emit("reaction", rxn);
    },
  },
  watch: {
    selected(rxn) {
      if (rxn) {
        this.selectedReaction = rxn;
        if (!rxn.hasOwnProperty("selected")) {
          this.selectedReaction.selected = true;
        }
      }
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
