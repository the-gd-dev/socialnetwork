<template>
  <div class="post-header flex w-full justify-between px-4 border-b">
    <div class="">
      <post-user
        :postUser="postUser"
        :postTime="updatedAt || createdAt"
        :linkToProfileDisable="linkDisabled"
      />
    </div>
    <div class="flex post-options">
      <post-options
        :privacyID="postPrivacy"
        @privacy="(v) => $emit('privacy-handler', v)"
        :owner="postUser.uuid === user.id"
        @delete="$emit('delete-post')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PostHeader",
  props: ["postUser", "createdAt", "updatedAt", "linkDisabled", "postPrivacy"],
};
</script>
