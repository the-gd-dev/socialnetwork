<template>
  <div class="animate-pulse flex space-x-2 items-center py-2" v-if="loading">
    <div class="rounded-full bg-blue-300 h-10 w-10"></div>
    <div class="flex-1 space-y-2 py-1">
      <div class="h-2 bg-blue-300 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-2 bg-blue-300 rounded col-span-4"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-content items-center space-x-2 py-2">
    <Icon v-if="!user.photo" name="user-circle" size="40px" />
    <profile-picture
      :userId="user.id"
      :url="user.photo"
      :loading="user.profilePicLoading"
      @loading-complete="user.profilePicLoading = false"
    />
    <div class="flex flex-col space-y-0">
      <div class="text-lg font-semibold leading-5">
        <nuxt-link :to="`profiles/${user.id}`">{{ user.name }}</nuxt-link>
      </div>
      <div class="text-sm">30 min ago</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostUser",
  props: ["userId"],
  data() {
    return {
      loading: true,
      user: {},
    };
  },
  async created() {
    this.loading = true;
    const { data } = await this.$axios.get(
      `https://randomuser.me/api/?id=${this.userId}`
    );
    this.user = {
      id: data.results[0].login.uuid,
      name: data.results[0].name.first + " " + data.results[0].name.last,
      username: data.results[0].username,
      email: data.results[0].email,
      photo: data.results[0].picture.medium,
      profilePicLoading: true,
    };
    this.loading = false;
  },
};
</script>

<style></style>
