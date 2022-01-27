<template>
  <div class="post-header flex justify-between px-4">
    <div class="">
      <post-user :userId="userId" />
    </div>
    <div class="flex post-options">
      <post-options />
    </div>
  </div>
</template>

<script>
export default {
  name: "PostHeader",
  props: ["userId"],
};
</script>

<style>
  .post-options .drop-popup.shown, 
  .post-options .drop-option:hover + .drop-popup{
    top: 35px !important; 
  }
</style>
