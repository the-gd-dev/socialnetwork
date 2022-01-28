<template>
  <div class="flex flex-col post-comment bg-gray-100 py-2 px-4 my-2 rounded-xl">
    <!-- Profile Info -->
    <div class="flex items-center justify-between ">
      <div class="flex items-center space-x-2 leading-3">
        <div class="_dp">
          <icon name="user-circle" size="30px" customClass="text-gray-400" />
        </div>
        <div class="text-md font-semibold text-gray-800">User Name</div>
      </div>
      <div class="text-sm font-semibold text-gray-400">few moments ago</div>
    </div>
    <!-- Comment -->
    <div class="flex flex-col text-gray-800 py-2">
      <p>
        {{ comment.body }}
      </p>
    </div>
    <!-- Reply and React -->
    <div class="flex space-x-3">
      <button class="text-sm font-semibold">
        <div class="flex justify-center items-center">
          <Reactions />
        </div>
      </button>
      <button class="text-sm font-semibold">Reply</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style></style>
