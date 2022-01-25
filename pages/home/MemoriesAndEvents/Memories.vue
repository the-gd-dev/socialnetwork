<template>
  <div
    class="notifications-area bg-gradient-to-tl from-gray-300 to-gray-100 rounded-xl p-2"
  >
     <div class="flex flex-col px-2">
      <div class="text-2xl font-semibold text-gray-800">
        Life moves so fast !
      </div>
      <div class="text-sm text-gray-600">Here are some of your memories.</div>
    </div>
     <horizontal-bar class="my-2" />
    <div class="flex flex-col py-4">
      <div class="flex items-center flex-col text-gray-500">
        <icon type="fa-solid" name="clock-rotate-left" size="50px" />
        <div class="text-lg">No memories Found</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
