<template>
  <div class="flex">
    <single-post :post="post" />
  </div>
</template>

<script>
import SinglePost from "~/components/Post/index.vue";
export default {
  components: { SinglePost },
  layout: "auth",
  async asyncData({ params, $axios }) {
    const { data } = await $axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    data.photo = {
      url: `https://picsum.photos/id/10${params.id}/600/600`,
      loading: true,
    };
    return { post: data };
  },
};
</script>
