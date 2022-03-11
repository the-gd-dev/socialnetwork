<template>
  <div class="flex flex-col bg-white border mb-4 w-full">
    <!-- Header -->
    <div class="header flex justify-between items-center px-2">
      <!-- profile-picture -->
      <div class="animate-pulse flex space-x-2 items-center py-2 pl-2">
        <div class="rounded-full bg-gray-300 h-10 w-10"></div>
        <div class="flex-1 space-y-2 py-1">
          <div class="h-2 bg-gray-300 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-6 gap-4">
              <div class="h-2 bg-gray-300 rounded col-span-4"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- user-options -->
      <div class="animate-pulse flex items-center py-2 pr-2">
        <div
          class="rounded-full bg-gray-300 u-dot"
          v-for="i in 3"
          :key="i"
        ></div>
      </div>
    </div>
    <!-- Post content -->
    <div class="post-content-skel">
      <div class="animate-pulse flex space-x-2 items-center py-2">
        <div class="bg-gray-300 p-square-skel"></div>
      </div>
    </div>
    <!-- Post Footer -->
    <div class="post-footer-skel">
      <div class="animate-pulse flex space-x-2 items-center py-2 px-2">
        <div class="rounded-full bg-gray-300 h-8 w-8"></div>
        <div class="flex-1 space-y-2 py-1">
          <div class="h-8 bg-gray-300 rounded-full"></div>
        </div>
        <div class="rounded-full bg-gray-300 h-8 w-20"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.u-dot:not(:last-child) {
  margin-right: 2px;
}
.u-dot {
  width: 4px;
  height: 4px;
}
.p-square-skel {
  width: 100%;
  min-height: 400px;
}
</style>
