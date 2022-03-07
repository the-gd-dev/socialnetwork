<template>
  <div
    class="mb-12 lg:rounded-xl p-4 user-cover"
    :style="`background: url(${
      thisUser.user_meta ? thisUser.user_meta.cover : ''
    }) no-repeat center;`"
  >
    <div class="flex-w-full" v-if="thisUser.uuid === user.id">
      <button
        @click="$emit('upload-new-cover')"
        class="bg-gray-100 p-1 px-4 text-white shadow-lg rounded-full"
      >
        <icon name="edit" customClass="text-gray-800" />
        <span class="text-gray-800">Change Cover</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name : "UserCoverPhoto",
    props : ['thisUser']
};
</script>

<style></style>
