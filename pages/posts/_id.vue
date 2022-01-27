<template>
  <div
    class="flex flex-col bg-gradient-to-tl from-gray-300 to-gray-200 mb-2 last:mb-0 rounded-xl"
  >
    <div class="flex justify-between px-4">
      <div class="">
        <post-user :userId="post.userId" />
      </div>
    </div>
    <!-- Post Content -->
    <div
      class="cursor-pointer flex items-center justify-center overflow-hidden"
    >
      <div class="m-auto" v-if="post.photo.loading">
        <spinner spinnerSize="spinner-2xl" />
      </div>
      <div>
        <img
          :src="post.photo.url"
          @load="post.photo.loading = false"
          alt=""
          srcset=""
          :class="`image ${post.photo.loading ? '' : 'loaded'}`"
        />
      </div>
    </div>
    <!-- Post Footer -->
    <post-footer :post="post" />
  </div>
</template>

<script>
import SinglePost from "~/components/Post/index.vue";
import PostFooter from "~/components/Post/PostFooter.vue";
import PostUser from "~/components/Post/PostUser.vue";
import Spinner from "~/components/Spinner.vue";
export default {
  components: { SinglePost, PostFooter, PostUser, Spinner },
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
