<template>
  <div
    class="flex person justify-between px-2 cursor-pointer hover:bg-gray-300 py-2"
  >
    <div class="left flex space-x-2">
      <profile-picture :url="user.photo" :loading="user.profilePicLoading" @loading-complete="user.profilePicLoading = false" />
      <div class="flex flex-col space-y-0">
        <div class="text-md font-semibold leading-5">
          {{
            user.name.length > 16 ? user.name.substr(0, 16) + "..." : user.name
          }}
        </div>
        <div class="text-sm">offline</div>
      </div>
    </div>
    <div class="right">
      <div class="user-status mt-1">
        <!-- user status -->
        <div v-if="user.status" class="w-3 h-3 rounded-full bg-green-500"></div>
        <div v-else class="w-3 h-3 rounded-full bg-gray-400"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name : 'Person',
    props : ['user']
};
</script>

<style></style>
