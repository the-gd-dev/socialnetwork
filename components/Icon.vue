<template>
  <span 
    :class="customClass" 
    :style="{fontSize : size}"
  >
    <i  :class="`${type} fa-${name}`" ></i>
  </span>
</template>

<script>
export default {
  props: {
    size: {
      default: 'inherit',
    },
    name : {default : ""},
    type: {
      default: "fa",
    },
    customClass : {default : ""},
  },
};
</script>

