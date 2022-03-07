<template>
  <div class="tabs-container flex flex-col items-start px-4">
    <div class="flex tab">
      <nuxt-link
        class="text-lg font-semibold py-2 px-3 border-b-2"
        v-for="tab in tabs"
        :key="tab._id"
        :to="`/${profile}${tab._slug ? '/' + tab._slug : ''}`"
        :class="`${
          tab._slug === selected
            ? 'border-blue-400'
            : 'border-transparent hover:bg-gray-100'
        }`"
      >
        {{ tab.title }}
        <span class="text-gray-400" v-if="tab.count">{{ tab.count }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePageTabs",
  props: ["selected", "profile"],
  data() {
    return {
      tabs: [
        {
          _id: 1,
          _slug: "",
          title: "About",
          customClass: "",
          count: 0,
          active: true,
        },

        {
          _id: 2,
          _slug: "friends",
          title: "Friends",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 3,
          _slug: "photos",
          title: "Photos",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 4,
          _slug: "videos",
          title: "Videos",
          customClass: "",
          count: 0,
          active: false,
        },
        {
          _id: 5,
          _slug: "followers",
          title: "Followers",
          customClass: "",
          count: 0,
          active: false,
        },
      ],
    };
  },
};
</script>

<style></style>
