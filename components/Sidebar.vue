<template>
  <div class="sidebar-container" :class="{ show: toggle }">
    <div class="flex flex-col justify-center w-full pt-2 sidebar-wrapper">
      <nuxt-link
        :to="item.url"
        v-for="item in sidemenu"
        :key="item._id"
        :class="
          $route.path === item.url ? 'bg-blue-600 text-white' : 'text-blue-500'
        "
        class="xl:border xl:rounded-lg sidebar-item hover:bg-blue-600 hover:text-white hover:border-blue-500 w-full py-2 px-4"
      >
        <div>
          <span class="mr-2">
            <Icon :name="item.icon.name" :type="item.icon.type" size="18px" />
          </span>
          {{ item.title }}
        </div>
      </nuxt-link>
    </div>
    <div class="flex flex-col justify-center items-center py-6">
      <div class="text-sm font-semibold text-gray-500">
        SocialNetwork &copy;2022
      </div>
      <div class="text-sm font-bold text-gray-700 my-1">The Good Developer</div>
      <div class="flex space-x-2 text-sm font-bold text-green-400">
        <NuxtIcon /> <LaravelLumen />
      </div>
    </div>
  </div>
</template>

<script>
import { globalEvent } from "~/helpers/globalEvent";
export default {
  props: {
    toggle: {
      default: false,
    },
  },
  name: "Sidebar",
  data() {
    return {
      sidemenu: [
        {
          _id: 1,
          title: "Home",
          url: "/home",
          icon: {
            type: "fa",
            name: "home",
          },
        },
        {
          _id: 2,
          title: "Profile",
          url: "",
          icon: {
            type: "fa",
            name: "user",
          },
        },
        {
          _id: 3,
          title: "Settings",
          url: "/settings",
          icon: {
            type: "fa",
            name: "cog",
          },
        },

        {
          _id: 4,
          title: "Privacy",
          url: "/privacy",
          icon: {
            type: "fa",
            name: "lock",
          },
        },

        {
          _id: 5,
          title: "Help",
          url: "/help",
          icon: {
            type: "fa",
            name: "info-circle",
          },
        },
      ],
    };
  },
  created() {
    let option = this.sidemenu.find((i) => i.title === "Profile");
    option.url = "/" + this.user.id;
  },
  methods: {
    nuxtClicked() {
      globalEvent.$emit("overlay", { toggle: false });
    },
  },
  watch: {
    toggle(v) {
      globalEvent.$emit("overlay", { toggle: v });
    },
  },
};
</script>
<style scoped>
.sidebar-container.show {
  opacity: 1;
  transform: translateX(0px);
}
.sidebar-container {
  background: white;
  position: fixed;
  height: 100%;
  width: 60%;
  z-index: 1000;
  padding: 10px 15px;
  opacity: 1;
  transform: translateX(-350px);
  transition: all ease-in-out 0.3s;
}
@media (min-width: 576px) {
  .sidebar-container {
    width: 40%;
  }
}
@media (min-width: 767px) {
  .sidebar-container {
    width: 30%;
  }
}
@media (min-width: 1280px) {
  .sidebar-container {
    background: white;
    /* position: sticky ; */
    height: 100%;
    top: 70px;
    width: 12.5%;
    z-index: 1;
    opacity: 1;
    transform: translateX(0px);
    padding: 0;
  }
}
.from-top-64 {
  top: 70px;
}
.z-1000 {
  z-index: 1000;
}
.sidebar-item {
  transition: all ease-in-out 0.25s;
}
.sidebar-wrapper .sidebar-item:not(:last-child) {
  margin-bottom: 10px;
}
</style>
