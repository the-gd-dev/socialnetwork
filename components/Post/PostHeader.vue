<template>
  <div class="post-header flex justify-between px-4">
    <div class="">
      <post-user :userId="userId"  :postTime="updatedAt || createdAt" />
    </div>
    <div class="flex post-options">
      <post-options @delete="$emit('delete-post')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostHeader",
  props: ["userId", "createdAt", "updatedAt"],
};
</script>

