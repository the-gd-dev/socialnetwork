<template>
  <div class="border">
    <div
      class="flex justify-between items-center bg-blue-500 to-blue-200 pr-2 pl-4 py-2"
    >
      <div class="text-lg font-semibold text-white">Notifications</div>
      <div class="flex space-x-2">
        <div
          class="flex items-center rounded-full h-8 w-8 text-center bg-white text-blue-600"
        >
          <span class="m-auto text-lg font-semibold">10</span>
        </div>
      </div>
    </div>

    <div class="flex notification-wrapper flex-col bg-gray-100">
      <div v-if="loading">
        <div
          v-for="item in 12"
          :key="item"
          class="animate-pulse flex space-x-2 items-center py-2 pr-2 pl-4"
        >
          <div class="rounded-full bg-gray-400 h-5 w-5"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="h-2 bg-gray-400 rounded"></div>
          </div>
          <div class="bg-gray-400 h-4 w-4"></div>
        </div>
      </div>
      <div v-else>
        <div
          class="pr-2 pl-4 py-2 flex items-center flex-col cursor-pointer"
          v-for="item in notifications"
          :key="item"
        >
          <div
            class="notification-container flex items-center text-lg hover:font-semibold space-x-2"
          >
            <Icon name="bell" />
            <div class="notification">
              Lorem ipsum dolor sit amet consectetur.
            </div>
            <div class="status">
              <icon
                :name="!item.read ? 'check-double' : 'check'"
                type="fa"
                :class="item.read ? '' : 'text-gray-400'"
              />
            </div>
          </div>
          <div class="horizontal-bar"></div>
        </div>
        <div
          v-if="notifications.length === 0"
          class="flex h-full w-full items-center flex-col cursor-pointer"
        >
          <div class="m-auto text-lg">
            <Icon name="bell" />
            No Notifications found.
          </div>
        </div>
      </div>
    </div>
    <div class="bg-blue-500 w-full py-2 px-4 text-center">
      <nuxt-link to="/notifications" class="text-white">View all notifications</nuxt-link>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
export default {
  props: {
    notifications: {
      default: () => [],
    },
  },
  components: { Icon },
  name: "UserNotifications",
  data() {
    return {
      loading: false,
    };
  },
};
</script>

<style scoped>
.horizontal-bar {
}
/* .notification-container {
} */
.notification-wrapper {
  width: 400px;
  height: 500px;
  overflow-y: auto;
}
.notification-wrapper::-webkit-scrollbar {
  width: 5px;
}
/* .notification-wrapper::-webkit-scrollbar-track {
} */
.notification-wrapper::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}

.read-all-btn:hover .title-show {
  display: inline-block;
}
.read-all-btn .title-show {
  display: none;
}
</style>
