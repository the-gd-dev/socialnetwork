<template>
  <div
    class="post flex flex-col bg-gradient-to-tl from-gray-200 to-blue-100 mb-2 last:mb-0 rounded-xl"
  >
    <post-header :userId="post.userId" />
    <post-content :post="post" />
    <post-footer :post="post" />
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["post"],
};
</script>

<style scoped></style>
