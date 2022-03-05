<template>
  <modal
    :style="`margin-top: ${marginTop}; z-index: ${zIndex}`"
    headerTitle="Delete Post"
    animation="zoom"
    :showModal="showDeleteModal"
    @close-modal="$emit('close-delete')"
    :width="width"
    position="relative"
    :overlayHeight="overlayHeight"
  >
    <div class="flex flex-col py-2">
      <div class="text-md text-gray-800">
        This action is irreversible.<br />It will delete the post parmanently.
      </div>
      <div class="font-semibold text-lg"></div>
    </div>
    <template #modal-footer>
      <div class="bg-transparant py-2">
        <div class="flex space-x-2 justify-end">
          <button
            @click="$emit('delete-post')"
            class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-1"
          >
            Yes, I know
          </button>
          <button
            class="bg-white text-gray-800 hover:bg-gray-100 rounded-lg px-4 py-1"
            @click="$emit('close-delete')"
          >
            No
          </button>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    overlayHeight: { default: "365" },
    width: { default: "300" },
    marginTop: { default: "0px" },
    zIndex: { default: "0" },
    showHide: { default: false },
  },
  computed: {
    showDeleteModal() {
      return this.showHide;
    },
  },
};
</script>

<style></style>
