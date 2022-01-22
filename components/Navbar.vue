<template>
  <div
    class="flex p-2 px-6 justify-between bg-gradient-to-r from-emerald-300 to-emerald-200 items-center rounded-xl my-2"
  >
    <div class="flex space-x-2">
      <div class="text-xl font-bold text-emerald-900">
        <a href="#">Memorised</a>
      </div>
      <div class="nav-links"></div>
    </div>
    <div class="flex">
      <div class="auth-header space-x-2" v-if="!auth">
        <a href="#" class="text-lg text-white">Login</a>
        <a href="#" class="text-lg text-white">Register</a>
      </div>
      <div v-else class="flex items-center">
        <div class="flex space-x-4">
          <div class="drop-option flex items-center">
            <Icon name="bell" type="fa" size="26px" customClass="text-emerald-500 hover:text-emerald-800 cursor-pointer" />
            <!-- notification-popup -->
            <div class="drop-popup">
              <div
                class="flex notification-wrapper flex-col bg-blue-100 pr-2 pl-8 py-2 rounded-lg"
              >
                <div class="p-2" v-for="t in 10" :key="t">

                    
                    Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>
            </div>
            <!-- notification-popup -->
          </div>
          <div class="drop-option flex items-center space-x-2">
            <Icon name="user-circle" type="fa" size="26px" />
            <a href="#" class="text-gray-800">John Doe</a>
            <!-- user-nav-popup -->
            <div class="drop-popup">
              <div
                class="flex flex-col bg-gradient-to-t from-teal-400 to-teal-200 w-40 pr-2 pl-8 py-2 rounded-lg"
              >
                <a
                  href="#"
                  v-for="item in navbarLinks.auth"
                  :key="item._id"
                  class="text-lg text-gray-800 mb-1"
                >
                  <span class="mr-2"
                    ><Icon
                      :name="item.icon.name"
                      :type="item.icon.type"
                      size="18px"
                  /></span>

                  {{ item.title }}
                </a>
              </div>
            </div>
            <!-- user-nav-popup -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auth: { default: false },
  },
  data() {
    return {
      navbarLinks: {
        auth: [
          {
            _id: 1,
            title: "Settings",
            icon: {
              type: "fa",
              name: "gear",
            },
          },
          {
            _id: 2,
            title: "Privacy",
            icon: {
              type: "fa",
              name: "lock",
            },
          },
          {
            _id: 3,
            title: "Logout",
            icon: {
              type: "fa-solid",
              name: "arrow-right-from-bracket",
            },
          },
          {
            _id: 4,
            title: "Help",
            icon: {
              type: "fa",
              name: "circle-info",
            },
          },
        ],
        noauth: [],
      },
    };
  },
};
</script>

<style scoped>
.top-18 {
}
.drop-popup {
  position: absolute;
  opacity: 0;
  z-index: -1;
  right: 5.5%;
  transition: all ease-in-out 0.3s;
  top: 50px;
}
.drop-option:hover .drop-popup {
  opacity: 1;
  z-index: 999;
  top: 70px;
}
.notification-wrapper{
    width : 400px;
}
</style>
