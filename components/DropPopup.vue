<template>
  <div class="drop-option flex items-center">
    <slot name="drop-option"></slot>
    <div :class="`drop-popup ${popup === true ? 'shown' : ''}`">
      <slot name="drop-content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popup: {
      default: false,
    },
  },
};
</script>

<style scoped>
.drop-option {
  position: relative;
}
.drop-popup {
  position: absolute;
  opacity: 0;
  z-index: -1;
  right: -20px;
  top: 40px;
  max-height: 0;
  overflow: hidden;
  transition: all ease-in-out 0.3s;
}
.drop-popup.shown,
.drop-option:hover .drop-popup {
  opacity: 1;
  z-index: 999;
  top: 50px;
  max-height: initial !important;
}
</style>
