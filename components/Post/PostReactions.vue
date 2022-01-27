<template>
  <div class="flex">
    <div class="reacted">
      <button
        :class="`px-2 rounded-full flex justify-center items-center ${
          selectedReaction.selected
            ? selectedReaction.gradientClass
            : 'bg-white'
        }`"
      >
        <icon
          :name="selectedReaction.name"
          size="24px"
          :customClass="selectedReaction.customClass"
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
            <div class="">
              <icon
                :name="reaction.name"
                size="28px"
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
  created() {
    this.loading = true;
    setTimeout(() => {
      this.reactionList = [
        {
          _id: 1,
          selected: false,
          name: "face-smile",
          customClass: "text-yellow-500",
          gradientClass: "bg-gradient-to-tr from-yellow-500 to-yellow-100",
          label: "Happy",
        },
        {
          _id: 2,
          selected: false,
          name: "face-angry",
          customClass: "text-red-600",
          gradientClass: "bg-gradient-to-tr from-red-500 to-red-100",
          label: "Angry",
        },
        {
          _id: 3,
          selected: false,
          name: "face-sad-tear",
          customClass: "text-gray-500",
          gradientClass: "bg-gradient-to-tr from-gray-500 to-gray-100",
          label: "Sad",
        },
        {
          _id: 4,
          selected: false,
          name: "face-grin-hearts",
          customClass: "text-rose-500",
          gradientClass: "bg-gradient-to-tr from-rose-500 to-rose-100",
          label: "Love",
        },
        {
          _id: 5,
          selected: false,
          name: "face-rolling-eyes",
          customClass: "text-blue-500",
          gradientClass: "bg-gradient-to-tr from-blue-500 to-blue-100",
          label: "Annoyed",
        },
      ];
      this.loading = false;
    }, 2000);
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
.reaction:hover .rxn-icon {
  transform: scale(1.25);
}
.reaction .reaction-title,
.reaction .rxn-icon {
  transition: all ease-in-out 0.3s;
}
.reaction:hover .reaction-title {
  height: 100%;
  padding-left: 8px;
}
.reaction .reaction-title {
  height: 0px;
  overflow: hidden;
}
</style>
