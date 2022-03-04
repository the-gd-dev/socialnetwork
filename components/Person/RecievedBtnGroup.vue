<template>
  <div class="flex space-x-2">
    <button
      @click="$emit('on-confirm')"
      class="flex justify-center items-center w-10 lg:w-28 xl:w-32 bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-500 p-1 px-2 rounded-full space-x-2"
    >
      <span class="hidden lg:inline-block">Confirm</span>
      <icon name="check-circle" class="my-auto" />
    </button>
    <div>
      <button
        class="flex items-center"
        @click="$emit('on-decline')"
      >
        <div
          class="flex items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
        >
          <span class="hidden lg:inline-block mr-1">Decline</span>
          <icon name="times" class="my-auto" />
        </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:"ReceivedBtnGroup"
};
</script>

<style></style>
