<template>
  <div class="outer-profile-container xl:px-2 xl:mt-5">
    <div class="flex flex-col lg:px-6">
      <div
        class="header bg-gray-100 font-semibold text-2xl border-b py-2 text-blue-900 px-4"
      >
        Settings
        <span class="text-gray-500 text-lg" v-if="pageName">
          / {{ pageName }}</span
        >
      </div>
      <div class="flex content">
        <div class="w-1/6 bg-gray-100 lg:w-1/5 pb-4">
          <div class="sidebar-container h-96">
            <div
              class="flex flex-col justify-center w-full pt-2 sidebar-wrapper"
            >
              <nuxt-link
                :to="item.url"
                v-for="item in sidemenu"
                :key="item._id"
                :class="
                  $route.path === item.url
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-500'
                "
                class="sidebar-item hover:bg-blue-500 hover:text-white hover:border-blue-500 w-full py-2 px-4"
              >
                <div
                  class="flex justify-center lg:justify-start items-center"
                  @click="
                    () => (item.onClickHandler ? item.onClickHandler() : false)
                  "
                >
                  <span class="mr-2">
                    <Icon
                      :name="item.icon.name"
                      :type="item.icon.type"
                      size="18px"
                    />
                  </span>
                  <span class="hidden lg:inline"> {{ item.title }}</span>
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="w-3/4">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: { pageName: { default: "" } },
  data() {
    return {
      sidemenu: [
        {
          _id: 1,

          title: "Settings",
          url: "/settings",
          icon: {
            type: "fa",
            name: "cog",
          },
        },
        {
          _id: 2,
          title: "Password",
          url: "/settings/passwords",
          icon: {
            type: "fa",
            name: "key",
          },
        },
        {
          _id: 3,
          title: "Privacy",
          url: "/settings/privacy",
          icon: {
            type: "fa",
            name: "lock",
          },
        },

        {
          _id: 4,
          title: "Request",
          url: "/settings/request",
          icon: {
            type: "fa",
            name: "hand",
          },
        },
        {
          _id: 5,
          title: "Feedback",
          url: "/settings/feedback",
          icon: {
            type: "fa",
            name: "comment-dots",
          },
        },
      ],
    };
  },
};
</script>

<style></style>
