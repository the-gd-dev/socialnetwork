<template>
  <div
    class="flex person justify-between px-2 cursor-pointer hover:bg-gray-300 py-2"
    :class="person.selected ? 'bg-gray-300 sticky top-0' : ''"
    @click="$emit('person-clicked', person)"
  >
    <div class="left flex items-center space-x-2">
      <profile-picture
        :userId="person.id"
        :url="person.user_meta.display_picture"
        :loading="person.user_meta.profilePicLoading"
        @loading-complete="person.user_meta.profilePicLoading = false"
      />
      <div class="flex flex-col space-y-0">
        <nuxt-link :to="`profiles/${person.id}`" v-if="!noLinkToProfile">
          <div class="text-md font-semibold leading-5 my-auto">
            {{
              person.name.length > trimLength
                ? person.name.substr(0, trimLength) + "..."
                : person.name
            }}
          </div>
        </nuxt-link>
        <div v-else class="text-md font-semibold leading-5 my-auto">
          {{
            person.name.length > trimLength
              ? person.name.substr(0, trimLength) + "..."
              : person.name
          }}
        </div>
        <div class="text-sm" v-if="showStatus">{{ statusOrMessage }}</div>
        <div class="text-sm" v-if="showInfo">
          {{ person.location ? person.location.country : "" }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="user-status mt-1" v-if="showStatus">
        <user-status :status="person.status" />
      </div>
      <div v-if="connectOptions" class="flex space-x-2 my-auto">
        <div v-if="!person.request_sent" class="flex space-x-2">
          <button
            class="flex items-center"
            @click="$emit('add-friend', { person })"
          >
            <div
              class="flex w-10 lg:w-28 xl:w-32 justify-center bg-emerald-200 hover:bg-emerald-500 text-emerald-800 hover:text-white p-1 px-2 rounded-full space-x-1"
            >
              <span class="hidden lg:inline-block">Add Friend</span
              ><icon name="user-plus" class="my-auto" />
            </div>
          </button>
          <button
            class="flex items-center"
            @click="$emit('remove-friend', { person })"
          >
            <div
              class="items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
            >
              <span class="hidden lg:inline-block">Remove</span>
              <icon name="times" class="my-auto" />
            </div>
          </button>
        </div>
        <div class="flex space-x-2" v-else>
          <div
            class="flex justify-center items-center w-10 lg:w-28 xl:w-32 bg-teal-100 text-teal-500 p-1 px-2 rounded-full space-x-2"
          >
            <span class="hidden lg:inline-block">Sent</span
            ><icon name="check-circle" class="my-auto" />
          </div>
          <div v-if="showUndo">
            <button
              class="flex items-center"
              @click="$emit('remove-friend', { person })"
            >
              <div
                class="flex items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
              >
                <span class="hidden lg:inline-block">Undo</span>
                <icon name="undo" class="my-auto" />
              </div>
            </button>
          </div>
          <div v-else>
            <button
              class="flex items-center"
              @click="$emit('remove-friend', { person })"
            >
              <div
                class="flex items-center justify-center w-10 lg:w-28 xl:w-32 bg-white hover:bg-gray-100 text-gray-800 p-1 px-2 rounded-full space-x-1"
              >
                <span class="hidden lg:inline-block">Cancel</span>
                <icon name="times" class="my-auto" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserStatus from "../UserStatus.vue";
export default {
  components: { UserStatus },
  name: "Person",
  props: {
    showUndo: { default: false },
    statusOrMessage: { default: "offline" },
    personData: { default: {} },
    trimLength: {
      default: 15,
    },
    showStatus: { default: true },
    showInfo: { default: false },
    connectOptions: { default: false },
    noLinkToProfile: { default: false },
  },
  data() {
    return {
      person: {},
    };
  },
  created() {
    this.person = {
      ...this.personData,
      user_meta: { ...this.personData.user_meta, profilePicLoading: false },
    };
  },
};
</script>

<style></style>
