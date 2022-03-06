<template>
  <div
    @click="$emit('on-click')"
    :style="`background:url(${url}) no-repeat center;background-size:cover; ${isNonTrashableImage ? 'opacity:0.5;' :''}`"
  >
    <div
      v-if="mediaOwner.uuid === user.id"
      class="flex justify-end space-y-2 px-2 w-full py-2"
    >
      <button
        v-if="selectBtn"
        class="bg-white text-blue-500 hover:text-blue-800 w-6 h-6 rounded-full flex justify-center items-center border"
      >
        <icon v-if="selectIcon" name="check-circle" />
      </button>
      <button
        v-if="trashIcon && !isNonTrashableImage"
        @click="$emit('delete')"
        class="bg-gray-100 hover:bg-gray-200 shadow-md w-8 h-8 text-gray-600 hover:text-gray-800 p-1 rounded-lg border"
      >
        <Icon name="trash" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: { default: "" },
    mediaOwner: { default: "" },
    trashIcon: { default: false },
    selectBtn: { default: false },
    selectIcon: { default: false },
  },
  computed: {
    isNonTrashableImage() {
      return (
        this.mediaOwner.user_meta.display_picture == this.url ||
        this.mediaOwner.user_meta.cover == this.url
      );
    },
  },
};
</script>

<style></style>
