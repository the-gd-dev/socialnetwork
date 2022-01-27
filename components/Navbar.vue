<template>
  <div
    class="sticky top-2 z-900 flex p-2 px-6 justify-between bg-cyan-600 items-center rounded-xl my-2"
  >
    <div class="flex space-x-2">
      <div class="text-xl font-semibold text-white">
        <a href="#">Website Title</a>
      </div>
      <div class="nav-links"></div>
    </div>
    <div class="flex">
      <div class="auth-header space-x-2" v-if="!auth">
        <a
          href="#"
          v-for="item in navbarLinks.noauth"
          :key="item._id"
          class="text-lg text-emerald-900 hover:font-semibold"
        >
          <span
            ><Icon :name="item.icon.name" :type="item.icon.type" size="18px"
          /></span>

          {{ item.title }}
        </a>
      </div>
      <div v-if="auth" class="flex items-center">
        <!-- Mobile Menu -->
        <div class="flex lg:hidden space-x-4">
          <button>
            <Icon
              name="comments"
              type="fa"
              size="26px"
              :customClass="` ${
                popups.notifications ? 'text-white' : 'text-cyan-800'
              } hover:text-white cursor-pointer`"
            />
          </button>
          <button>
            <Icon
              name="bell"
              type="fa"
              size="26px"
              :customClass="` ${
                popups.notifications ? 'text-white' : 'text-cyan-800'
              } hover:text-white cursor-pointer`"
            />
          </button>
          <drop-popup :popup="popups.useroptions" customClass="custom-zindex">
            <template #drop-option>
              <button
                @click="togglePopup('useroptions')"
                :class="`username flex items-center space-x-2 ${
                  popups.useroptions ? 'text-white' : 'text-cyan-800'
                } hover:text-white cursor-pointer`"
              >
                <Icon name="user-circle" type="fa" size="26px" />
              </button>
            </template>
            <template #drop-content>
              <div
                class="flex flex-col bg-blue-100 w-40 pr-2 pl-8 py-2 rounded-lg"
              >
                <a
                  href="#"
                  v-for="item in navbarLinks.auth"
                  :key="item._id"
                  class="text-lg text-gray-800 mb-1 hover:font-semibold"
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
            </template>
          </drop-popup>
        </div>
        <!-- Large Screen -->
        <div class="hidden lg:flex space-x-4">
          <!-- <drop-popup>
            <template #drop-option>
              <Icon
                name="comments"
                type="fa"
                size="26px"
                customClass="text-emerald-500 hover:text-emerald-800 cursor-pointer"
              />
              
            </template>
            <template #drop-content>
              <messages />
            </template>
          </drop-popup> -->
          <drop-popup :popup="popups.notifications" customClass="custom-zindex">
            <template #drop-option>
              <button @click="togglePopup('notifications')">
                <Icon
                  name="bell"
                  type="fa"
                  size="26px"
                  :customClass="` ${
                    popups.notifications ? 'text-white' : 'text-cyan-800'
                  } hover:text-white cursor-pointer`"
                />
              </button>
            </template>
            <template #drop-content>
              <notifications />
            </template>
          </drop-popup>
          <drop-popup :popup="popups.useroptions" customClass="custom-zindex">
            <template #drop-option>
              <button
                @click="togglePopup('useroptions')"
                :class="`username flex items-center space-x-2 ${
                  popups.useroptions ? 'text-white' : 'text-cyan-800'
                } hover:text-white cursor-pointer`"
              >
                <Icon name="user-circle" type="fa" size="26px" />
                <a href="#" class="font-semibold">John Doe</a>
              </button>
            </template>
            <template #drop-content>
              <div
                class="flex flex-col bg-blue-100 w-40 pr-2 pl-8 py-2 rounded-lg"
              >
                <a
                  href="#"
                  v-for="item in navbarLinks.auth"
                  :key="item._id"
                  class="text-lg text-gray-800 mb-1 hover:font-semibold"
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
            </template>
          </drop-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { globalEvent } from "@/helpers/globalEvent";
export default {
  props: {
    auth: { default: false },
  },
  created() {
    globalEvent.$on("container-clicked", () => {
      for (const index in this.popups) {
        if (Object.hasOwnProperty.call(this.popups, index)) {
          this.popups[index] = false;
        }
      }
    });
  },
  data() {
    return {
      popups: {
        notifications: false,
        useroptions: false,
      },
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
        noauth: [
          {
            _id: 1,
            title: "Login",
            icon: {
              type: "fa-solid",
              name: "arrow-right-to-bracket",
            },
          },
          {
            _id: 2,
            title: "Register",
            icon: {
              type: "fa-solid",
              name: "user-plus",
            },
          },
        ],
      },
    };
  },
  methods: {
    togglePopup(key) {
      for (const index in this.popups) {
        if (Object.hasOwnProperty.call(this.popups, index)) {
          this.popups[index] = index === key ? !this.popups[key] : false;
        }
      }
    },
  },
};
</script>
<style>
.custom-zindex + .drop-popup.shown {
  z-index: 1000 !important;
}
</style>
<style scoped>
.top-18 {
}
.z-900 {
  z-index: 999;
}
</style>
