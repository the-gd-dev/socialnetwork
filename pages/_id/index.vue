<template>
  <profile-layout :profileId="userId" @user-data-loaded="setUserData">
    <div class="flex flex-col lg:flex-row justify-center">
      <div class="w-full lg:w-2/5">
        <div
          class="flex bg-white mt-2 flex-col rounded-xl shadow-lg border border-gray-100 sticky top-72"
        >
          <div class="tab-span show p-4">
            <div class="text-xl font-semibold text-gray-800">About Me</div>
          </div>
          <HorizontalBar height="1" />
          <div class="flex flex-col space-y-2 py-2">
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold text-gray-800">
                Gender
              </div>
              <div class="w-3/4 text-lg">{{ thisUser.gender }}</div>
            </div>
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold text-gray-800">
                Birthday
              </div>
              <div class="w-3/4 text-lg">
                {{ formatDate(thisUser.dob, "Do MMM Y") }}
              </div>
            </div>
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold">Age</div>
              <div class="w-3/4 text-lg">{{ thisUser.age }} Yrs</div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/5 lg:flex justify-end lg:pl-4 py-2">
        <user-posts :posts="posts" :loading="postsLoading" />
      </div>
    </div>
  </profile-layout>
</template>

<script>
import moment from "moment";
import ProfileLayout from "~/components/Profile/index.vue";
import UserPosts from "~/components/Posts/UserPosts.vue";
export default {
  name: "About",
  layout: "auth",
  data() {
    return {
      thisUser: {},
      postsLoading: false,
      posts : []
    };
  },
  components: { ProfileLayout, UserPosts },
  asyncData({ params }) {
    return { userId: params.id };
  },
  async created() {
   
  },
  methods: {
    setUserData(value) {
      console.log(value);
      this.thisUser = value;
    },
    formatDate(date, format) {
      return moment(date).format(format);
    },
  },
};
</script>
