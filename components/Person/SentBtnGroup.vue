<template>
  <div class="flex space-x-2">
    <div
      class="flex justify-center items-center w-10 lg:w-28 xl:w-32 bg-teal-100 text-teal-500 p-1 px-2 rounded-full space-x-2"
    >
      <span class="hidden lg:inline-block">Sent</span
      ><icon name="check-circle" class="my-auto" />
    </div>
    <div v-if="undo">
      <button class="flex items-center" @click="$emit('on-undo')">
        <div
          class="flex items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
        >
          <span class="hidden lg:inline-block">Undo</span>
          <icon name="undo" class="my-auto" />
        </div>
      </button>
    </div>
    <div v-else>
      <button class="flex items-center" @click="$emit('on-remove')">
        <div
          class="flex items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
        >
          <span class="hidden lg:inline-block">Cancel</span>
          <icon name="times" class="my-auto" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SentBtnGroup",
  props: {
    undo: { default: false },
  },
};
</script>

<style></style>
