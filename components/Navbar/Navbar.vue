<template>
  <div
    class="sticky top-0 z-910 flex py-2 xl:-mx-4 px-6 justify-between bg-white items-center border-b"
  >
    <div class="items-center xl:w-1/4 justify-between hidden xl:flex">
      <Branding />
      <div class="nav-links flex ml-10">
        <div class="flex w-full flex-col items-center">
          <search-user
            @input-resetted="resetSearches = false"
            :resetSearchInput="resetSearches"
            @search-complete="
              (list) => ((searchUsersList = list), (waitingForResults = false))
            "
            @searching="() => (waitingForResults = true)"
          />
          <div
            class="w-96 bg-white z-9999 top-14 border-top absolute search-users-list-wrap"
            :class="waitingForResults || searchUsersList.length ? 'show' : ''"
          >
            <search-users-list
              @result-click="resetSearches = true"
              :loadingSearchItems="waitingForResults"
              :searchItems="searchUsersList"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full xl:w-3/4 items-center justify-end" v-if="auth">
      <!-- Mobile Menu -->
      <div class="xl:hidden w-full">
        <div class="w-full flex justify-between items-center">
          <nuxt-link :to="'/home'">
            <Branding />
          </nuxt-link>
          <mobile-nav-btn
            @on-click=" () => btn.onClickHandler()"
            v-for="btn in mobileNavLinks"
            :key="btn.id"
            :pageLabel="btn.label"
            :pageIcon="btn.icon"
            :pageIconSize="btn.iconSize"
            :pageURI="btn.uri"
          />
          <nuxt-link
            :to="'/' + user.id"
            class="my-auto flex items-center space-x-2 hover:bg-gray-100 py-2 px-4"
          >
            <img
              :src="user.user_meta.display_picture"
              :alt="user.name"
              class="h-8 w-8 rounded-full"
            />
            <div class="text-blue-700 hidden md:inline text-lg font-semibold">
              {{ user.name }}
            </div>
            <!-- <profile-picture
            customClass="h-8 w-8 relative"
            :linkToProfile="!linkToProfileDisable"
            :userId="user.uuid"
            :url="user.user_meta.display_picture"
            :loading="user.user_meta.profilePicLoading"
          /> -->
          </nuxt-link>

          <button
            @click="$emit('toggle-sidebar')"
            class="flex items-center justify-center space-x-2 text-blue-700 hover:bg-gray-100 px-2 py-1"
          >
            <Icon name="bars" type="fa" size="26px" />
          </button>
        </div>
        <div class="flex w-full flex-cols items-center py-2" v-if="showMobileSearch">
          <search-user
            @input-resetted="resetSearches = false"
            :resetSearchInput="resetSearches"
            @search-complete="
              (list) => ((searchUsersList = list), (waitingForResults = false))
            "
            @searching="() => (waitingForResults = true)"
          />
          <div
            class="w-5/6 md:w-3/4 bg-white z-9999 top-28 border-top absolute search-users-list-wrap"
            :class="waitingForResults || searchUsersList.length ? 'show' : ''"
          >
            <search-users-list
              @result-click="resetSearches = true"
              :loadingSearchItems="waitingForResults"
              :searchItems="searchUsersList"
            />
          </div>
        </div>
      </div>
      <!-- Large Screen -->
      <div class="hidden xl:flex space-x-4">
        <drop-popup v-if="currentPath !== '/messages'" :popup="popups.messages" customClass="custom-zindex">
          <template #drop-option>
            <button @click="togglePopup('messages')">
              <Icon
                name="comments"
                type="fa"
                size="26px"
                :customClass="`text-blue-700  cursor-pointer`"
              />
            </button>
          </template>
          <template #drop-content>
            <user-messages />
          </template>
        </drop-popup>
        <drop-popup v-if="currentPath !== '/notifications'" :popup="popups.notifications" customClass="custom-zindex">
          <template #drop-option>
            <button @click="togglePopup('notifications')">
              <Icon
                name="bell"
                type="fa"
                size="26px"
                :customClass="`text-blue-700  cursor-pointer`"
              />
            </button>
          </template>
          <template #drop-content>
            <user-notifications />
          </template>
        </drop-popup>
        <drop-popup :popup="popups.useroptions" customClass="custom-zindex">
          <template #drop-option>
            <button
              @click="togglePopup('useroptions')"
              :class="`username flex items-center space-x-2 text-blue-700  cursor-pointer`"
            >
              <img
                :src="user.user_meta.display_picture"
                :alt="user.name"
                class="h-7 w-7 rounded-full"
              />
              <a href="#" class="font-semibold">{{ user.name }}</a>
            </button>
          </template>
          <template #drop-content>
            <div
              class="flex flex-col bg-white shadow-md border w-40 pr-2 pl-4 py-2 rounded-lg cursor-pointer"
            >
              <a
                v-for="item in navbarLinks.auth"
                :key="item._id"
                @click="() => item.onClickHandler()"
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
</template>

<script>
import { globalEvent } from "@/helpers/globalEvent";
import SearchUser from "~/components/SearchUsers/SearchUserInput.vue";
import SearchUsersList from "~/components/SearchUsers/SearchUsersList.vue";
import UserNotifications from "./UserNotifications.vue";
import UserMessages from "./UserMessages.vue";
import MobileNavBtn from "./MobileNavBtn.vue";
export default {
  name: "Navbar",
  components: {
    SearchUser,
    SearchUsersList,
    UserNotifications,
    UserMessages,
    MobileNavBtn,
  },
  props: {
    auth: { default: false },
  },
  created() {
    globalEvent.$on("container-clicked", () => {
      this.searchUsersList = [];
      for (const index in this.popups) {
        if (Object.hasOwnProperty.call(this.popups, index)) {
          this.popups[index] = false;
        }
      }
    });
  },
  data() {
    return {
      showMobileSearch: false,
      resetSearches: false,
      searchUsersList: [],
      waitingForResults: false,
      popups: {
        notifications: false,
        useroptions: false,
        messages: false,
      },
      mobileNavLinks: [
        {
          id: 1,
          label: "Search",
          icon: "search",
          iconSize: "26px",
          onClickHandler: () => {
            this.showMobileSearch = !this.showMobileSearch;
          },
        },
        {
          id: 2,
          uri: "/messages",
          label: "Message",
          icon: "comments",
          iconSize: "26px",
        },
        {
          id: 3,
          uri: "/notifications",
          label: "Notifications",
          icon: "bell",
          iconSize: "26px",
        },
        // {
        //   id: 4,
        //   uri: "#",
        //   label: "",
        //   icon: "user-circle",
        //   iconSize: "26px",
        // },
      ],
      navbarLinks: {
        auth: [
          {
            _id: 1,
            title: "Settings",
            onClickHandler: function (params) {},
            icon: {
              type: "fa",
              name: "gear",
            },
          },
          {
            _id: 2,
            title: "Privacy",
            onClickHandler: function (params) {},
            icon: {
              type: "fa",
              name: "lock",
            },
          },
          {
            _id: 3,
            title: "Logout",
            onClickHandler: (params) => {
              if (confirm("Leaving so soon ?")) {
                this.logOut();
              }
            },
            icon: {
              type: "fa-solid",
              name: "arrow-right-from-bracket",
            },
          },
          {
            _id: 4,
            title: "Help",
            onClickHandler: function (params) {},
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
  watch: {
    resetSearches(v) {
      if (v) {
        this.searchUsersList = [];
      }
    },
  },
  beforeDestroy() {
    globalEvent.$off("container-clicked");
  },
};
</script>
<style>
.custom-zindex + .drop-popup.shown {
  z-index: 1000 !important;
}
</style>

<style scoped>
.search-users-list-wrap.show {
  opacity: 1;
  transform: translateY(0);
}
.search-users-list-wrap {
  max-height: 400px;
  overflow-y: auto;
  opacity: 0;
  transform: translateY(-8px);
  transition: all ease-in-out 0.25s;
  border-bottom-left-radius: 18px;
  box-shadow: gray 0px 5px 10px;
  border-bottom-right-radius: 18px;
}
.search-users-list-wrap::-webkit-scrollbar {
  width: 5px;
}
.search-users-list-wrap::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.search-users-list-wrap::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
.z-910 {
  z-index: 1000;
}
.z-900 {
  z-index: 999;
}
</style>
