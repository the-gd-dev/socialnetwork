<template>
  <div :class="`overlay-modal ${showModal ? 'show' : ''}`">
    <div
      :class="`modal-wrapper bg-gradient-to-tl from-${background}-300 to-${background}-100 shadow-lg`"
      :style="{
        width: width + 'px',
        height: height + 'px',
        borderRadius: rounded + 'px',
      }"
    >
      <div class="modal-container px-4 py-2">
        <div class="modal-header">
          <slot name="modal-header">
            <div class="flex justify-between">
              <div class="text-xl font-semibold">{{ headerTitle }}</div>
              <div class="text-xl font-semibold cursor-pointer" @click="close">
                <icon name="times" />
              </div>
            </div>
          </slot>
        </div>
        <div class="modal-content">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: { default: "gray" },
    width: { default: 500 },
    height: { default: '100%' },
    rounded: { default: 10 },
    showModal: { default: false },
    headerTitle: { default: "" },
  },
  layout: "auth",
  name: "Modal",
  head() {
    return {
      bodyAttrs: {
        class: this.isModalToggle ? "modal-opened" : "",
      },
    };
  },
  methods: {
    close() {
      this.showModal = false;
      this.$emit("close-modal");
    },
  },
  computed: {
    isModalToggle() {
      return this.showModal;
    },
  },
  watch: {
    isMenuOpen() {
      this.head();
    },
  },
};
</script>

<style scoped>
.modal-container {
}
.modal-wrapper {
  margin: auto;
  transition: all ease-in-out 0.3s;
}
.overlay-modal.show {
  display: flex;
  z-index: 9999;
}
.overlay-modal {
  position: fixed;
  display: none;
  align-items: center;
  justify-items: center;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  -moz-backdrop-filter: blur(3px);
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>