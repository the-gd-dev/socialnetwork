<template>
  <div class="flex space-x-2">
    <button class="flex items-center" @click="$emit('on-add')">
      <div
        class="flex justify-center bg-blue-300 hover:bg-blue-500 text-blue-800 hover:text-white p-1 px-2 rounded-full space-x-1"
      >
        <span class="hidden lg:inline-block">Add Friend</span
        ><icon name="user-plus" class="my-auto" />
      </div>
    </button>
    <button
      class="flex items-center"
      @click="$emit('on-remove')"
    >
      <div
        class="items-center justify-center bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
      >
        <span class="hidden lg:inline-block">Remove</span>
        <icon name="times" class="my-auto" />
      </div>
    </button>
  </div>
</template>

<script>
export default {
    name : 'AddBtnGroup'
};
</script>

<style></style>
