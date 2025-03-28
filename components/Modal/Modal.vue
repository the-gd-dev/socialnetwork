<template>
  <div
    :class="`overlay-modal ${showModal ? 'show' : ''} ${position}`"
    :style="{
      height: overlayHeight.toString().indexOf('%') == -1 ? overlayHeight + 'px' : overlayHeight,
    }"
    @click="close"
  >
    <div
      :class="`modal-wrapper  border border-gray-300 ${
        showModal ? animation + 'In' : animation + 'Out'
      } ${ background ? 'bg-gradient-to-tl from-'+background+'-300 to-'+background+'-100' : 'bg-white'}`"
      :style="{
        width: width.indexOf('%') == -1 ? width + 'px' : width,
        height: height.indexOf('%') == -1 ? height + 'px' : height,
        borderRadius: rounded + 'px',
      }"
    >
      <div class="modal-container px-4 py-2">
        <div class="modal-header" v-if="showFooterHeader">
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
        <div class="modal-footer" v-if="showFooterHeader">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showFooterHeader: { default: true },
    position: { default: "absolute" },
    background: { default: "gray" },
    width: { default: 500 },
    height: { default: "auto" },
    overlayHeight: { default: "100%" },
    rounded: { default: 10 },
    showModal: { default: false },
    headerTitle: { default: "" },
    animation: { default: "fade" },
  },
  layout: "auth",
  name: "Modal",
  head() {
    return {
      bodyAttrs: {
        class: this.isModalToggle ? "overlay-opened" : "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
  },
  computed: {
    isModalToggle() {
      if (this.position === "fixed" || this.position === "absolute"){
        return this.showModal;
      }
      return false;
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
@keyframes fadeIn {
  0% {
    opacity: 0.3;
    top: -25px;
  }
  100% {
    opacity: 1;
    top: 0px;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
    top: 0px;
  }
  100% {
    opacity: 0.3;
    top: -25px;
  }
}
@keyframes zoomIn {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes zoomOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.3);
    opacity: 0;
  }
}
.modal-wrapper.zoomIn {
  animation: zoomIn 0.3s ease-in-out;
}
.modal-wrapper.zoomOut {
  animation: zoomOut 0.3s ease-in-out;
}
.modal-wrapper.fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
.modal-wrapper.fadeOut {
  animation: fadeOut 0.3s ease-in-out;
}
.modal-wrapper {
  position: relative;
  margin: auto;
  transition: all ease-in-out 0.3s;
  animation: fadeIn 0.3s ease-in-out;
}
.overlay-modal.show {
  display: flex;
  z-index: 9999;
}
.overlay-modal {
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
