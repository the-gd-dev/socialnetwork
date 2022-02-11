<template>
  <profile-layout :profileId="userId" @user-data-loaded="setUserData">
    <div class="flex flex-col  lg:flex-row justify-center items-start">
      <div class="w-full hidden lg:block lg:w-1/3 px-4 sticky top-72">
        <div
          class="flex bg-white mt-2 flex-col rounded-xl shadow-lg border border-gray-200"
        >
          <div class="tab-span show py-2 px-4">
            <div class="text-lg font-semibold text-gray-900">About Me</div>
          </div>
          <HorizontalBar height="1" />
          <div class="flex flex-col space-y-2 py-2">
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold text-gray-800">
                Gender
              </div>
              <div class="w-3/4 text-lg capitalize">{{ aboutData.gender }}</div>
            </div>
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold text-gray-800">
                Birthday
              </div>
              <div class="w-3/4 text-lg">
                {{ formatDate(aboutData.birthday, "Do MMMM Y") }}
              </div>
            </div>
            <div class="flex px-4">
              <div class="w-1/4 text-lg font-semibold">Age</div>
              <div class="w-3/4 text-lg">
                {{ calcuateAgeFromDob(aboutData.birthday) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/3 lg:flex justify-end lg:pl-4 py-2 pr-4">
        <div class="flex flex-col ">
          <div class="flex lg:hidden flex-col space-y-2 py-2 px-4 bg-white mb-4 rounded-xl shadow-lg border border-gray-200">
            <div class="flex flex-col lg:flex-row lg:items-center">
              <div class="w-full lg:w-1/6">
                <div class="text-lg font-semibold">Date :</div>
              </div>
              <div class="w-full lg:w-5/6">
                <div
                  class="flex flex-col lg:flex-row lg:space-x-2 lg:items-center"
                >
                  <input
                    pattern="\d{2}-\d{2}-\d{4}"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    class="border border-gray-400 rounded-lg px-1"
                  />
                  <div class="text-center font-semibold">To</div>
                  <input
                    pattern="\d{2}-\d{2}-\d{4}"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    class="border border-gray-400 rounded-lg px-1"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/5">
                <div class="text-lg font-semibold">Privacy :</div>
              </div>
              <div class="w-1/5">
                <privacy
                  @toggle-privacy="filterPrivacyToggle = !filterPrivacyToggle"
                  :toggle="filterPrivacyToggle"
                />
              </div>
            </div>
            <!-- <div class="flex">
              <div class="w-full lg:w-1/4">
                <div class="text-lg font-semibold">Privacy</div>
              </div>
              <div class="w-full lg:w-3/4"></div>
            </div> -->
          </div>
          <user-posts
            :link2ProfileDis="true"
            :posts="posts"
            v-if="posts.length > 0"
            :loading="postsLoading"
          />
        </div>
      </div>
      <div class="w-full hidden lg:w-1/3 lg:flex justify-end px-4 sticky top-72">
        <div
          class="w-full flex bg-white mt-2 flex-col rounded-xl shadow-lg border border-gray-200"
        >
          <div class="tab-span show py-2 px-4">
            <div class="text-lg font-semibold text-gray-900">Filter Posts</div>
          </div>
          <HorizontalBar height="1" />
          <div class="flex flex-col space-y-2 py-2 px-4">
            <div class="flex flex-col lg:flex-row lg:items-center">
              <div class="w-full lg:w-1/6">
                <div class="text-lg font-semibold">Date :</div>
              </div>
              <div class="w-full lg:w-5/6">
                <div
                  class="flex flex-col lg:flex-row lg:space-x-2 lg:items-center"
                >
                  <input
                    pattern="\d{2}-\d{2}-\d{4}"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    class="border border-gray-400 rounded-lg px-1"
                  />
                  <div class="text-center font-semibold">To</div>
                  <input
                    pattern="\d{2}-\d{2}-\d{4}"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    class="border border-gray-400 rounded-lg px-1"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center">
              <div class="w-1/5">
                <div class="text-lg font-semibold">Privacy :</div>
              </div>
              <div class="w-1/5">
                <privacy
                  @toggle-privacy="filterPrivacyToggle = !filterPrivacyToggle"
                  :toggle="filterPrivacyToggle"
                />
              </div>
            </div>
            <!-- <div class="flex">
              <div class="w-full lg:w-1/4">
                <div class="text-lg font-semibold">Privacy</div>
              </div>
              <div class="w-full lg:w-3/4"></div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </profile-layout>
</template>

<script>
import moment from "moment";
import ProfileLayout from "~/components/Profile/index.vue";
import UserPosts from "~/components/Posts/UserPosts.vue";
import calculateAge from "~/helpers/calculateAge";
import { axiosGet } from "~/helpers/axiosHelpers";
import Privacy from "~/components/Privacy.vue";
export default {
  name: "About",
  layout: "auth",
  data() {
    return {
      aboutData: {},
      filterPrivacyToggle: false,
      postsLoading: false,
      posts: [],
    };
  },
  components: { ProfileLayout, UserPosts, Privacy },
  asyncData({ params }) {
    return { userId: params.id };
  },
  async created() {
    let { data } = await axiosGet("posts", "id=" + this.userId);
    this.posts = data.posts.data;
  },
  methods: {
    setUserData(value) {
      this.aboutData = value.user_meta;
    },
    formatDate(date, format) {
      return moment(date).format(format);
    },
    calcuateAgeFromDob(date) {
      return calculateAge(date);
    },
  },
};
</script>
