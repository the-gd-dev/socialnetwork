<template>
  <div class="post-header flex justify-between px-4">
    <div class="">
      <post-user :postUser="postUser"  :postTime="updatedAt || createdAt" :linkToProfileDisable="linkDisabled" />
    </div>
    <div class="flex post-options">
      <post-options :owner="postUser.uuid === user.id" @delete="$emit('delete-post')"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostHeader",
  props: ["postUser","createdAt", "updatedAt", "linkDisabled"],
};
</script>

