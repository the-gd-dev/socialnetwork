<template>
  <div class="post-content cursor-pointer flex items-center justify-center">
    <div class="m-auto" v-if="post.photo.loading">
      <spinner spinnerSize="spinner-2xl" />
    </div>
    <img
      :src="post.photo.url"
      @load="post.photo.loading = false"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
export default {
    name:'PostContent',
    props : ['post']
};
</script>

<style scoped>
.post-content {
  min-height: 400px;
}
</style>
