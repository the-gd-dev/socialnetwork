<template>
  <div
    class="sticky top-20 flex w-full flex-col bg-gray-100 shadow-md border border-gray-200 rounded-md"
  >
    <div class="flex flex-col justify-center w-full px-2 pt-6 sidebar-wrapper">
      <nuxt-link
        href
        to="/home"
        v-for="item in sidemenu"
        :key="item._id"
        class="sidebar-item text-gray-800 rounded w-full py-2 px-4"
      >
        <div>
          <span class="mr-2">
            <Icon :name="item.icon.name" :type="item.icon.type" size="18px" />
          </span>
          {{ item.title }}
        </div>
      </nuxt-link>
    </div>
    <div class="flex justify-center items-center h-20">
      Copyright &copy; 2022
    </div>
  </div>
</template>

<script>
export default {
  name : "Sidebar",
  data() {
    return {
      sidemenu: [
        {
          _id: 1,
          title: "Home",
          icon: {
            type: "fa",
            name: "home",
          },
        },
        {
          _id: 2,
          title: "Profile",
          icon: {
            type: "fa",
            name: "user",
          },
        },
        {
          _id: 3,
          title: "Memories",
          icon: {
            type: "fa",
            name: "clock-rotate-left",
          },
        },
        {
          _id: 4,
          title: "Friends",
          icon: {
            type: "fa",
            name: "users",
          },
        },
        {
          _id: 5,
          title: "Privacy",
          icon: {
            type: "fa",
            name: "lock",
          },
        },
        {
          _id: 6,
          title: "Settings",
          icon: {
            type: "fa",
            name: "gear",
          },
        },
      ],
    };
  },
  asyncData() {},
};
</script>

<style scoped>
.from-top-64 {
  top:70px
}
.sidebar-item {
  transition: all ease-in-out 0.25s;
}
.sidebar-wrapper .sidebar-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
