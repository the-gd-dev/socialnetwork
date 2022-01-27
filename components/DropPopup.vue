<template>
  <div class="flex items-center drop-option-wrapper">
    <div :class="`drop-option ${customClass}`"><slot name="drop-option"></slot></div>
    <div :class="`drop-popup${popup === true ? ' shown' : ''}`">
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
    customClass :{
      default : ""
    }
  },
};
</script>

<style scoped>
.drop-option-wrapper {
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
.drop-popup.shown {
  opacity: 1;
  z-index: 900;
  top: 50px;
  max-height: initial !important;
}
</style>
