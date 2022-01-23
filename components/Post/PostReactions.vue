<template>
  <div class="flex">
    <div class="reacted">
      <button
        class="bg-white px-2 rounded-full flex justify-center items-center " 
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
            @click="selectedReaction = reaction"
          >
            <icon
              :name="reaction.name"
              size="28px"
              :customClass="reaction.customClass"
            />
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
        name: "face-smile",
        customClass: "text-yellow-500",
        label:'Happy'
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
          name: "face-smile",
          customClass: "text-yellow-500",
          label:'Happy'
        },
        {
          _id: 2,
          name: "face-angry",
          customClass: "text-red-600",
          label:'Angry'
        },
        {
          _id: 3,
          name: "face-sad-tear",
          customClass: "text-gray-500",
          label:'Sad'
        },
        {
          _id: 4,
          name: "face-grin-hearts",
          customClass: "text-rose-500",
          label:'Love'
        },
        {
          _id: 5,
          name: "face-rolling-eyes",
          customClass: "text-blue-500",
          label:'Annoyed'
        },
      ];
      this.loading = false;
    }, 2000);
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
  /* max-height: 80px !important; */
}
.reaction {
  position: relative;
  top: 0;
  transition: all ease-in-out 0.3s;
}
.reaction:hover {
  top: -10px;
  transform: scale(1.5);
}
</style>
