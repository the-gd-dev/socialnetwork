<template>
  <div
    class="flex person justify-between items-center px-2 cursor-pointer hover:bg-gray-300 py-2"
    :class="person.selected ? 'bg-gray-300 sticky top-0' : ''"
    @click="$emit('person-clicked', person)"
  >
    <div class="left flex items-center space-x-2">
      <profile-picture
        :userId="person.uuid"
        :url="person.user_meta.display_picture"
        :loading="person.user_meta.profilePicLoading"
        @loading-complete="person.user_meta.profilePicLoading = false"
      />
      <div class="flex flex-col space-y-0">
        <nuxt-link :to="`/${person.uuid}`" v-if="!noLinkToProfile">
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
      <!-- For New People Section -->
      <div v-if="connectOptions" class="flex space-x-2 my-auto">
        <add-btn-group
          v-if="!person.request_sent"
          class="flex space-x-2"
          @on-add="$emit('add-friend', { person })"
          @on-remove="$emit('remove-friend', { person })"
        />
        <sent-btn-group
          v-else
          :undo="showUndo"
          @on-undo="$emit('remove-friend', { person })"
          @on-remove="$emit('remove-friend', { person })"
        />
      </div>
      <!-- For Requests Section -->
      <div v-else class="flex space-x-2 my-auto">
        <div class="flex space-x-2" v-if="person.requestType == 'sent'">
          <sent-btn-group
            @on-undo="$emit('remove-friend', person.requestId)"
            @on-remove="$emit('remove-friend', person.requestId)"
          />
        </div>
        <div class="flex space-x-2" v-if="person.requestType == 'recieved'">
          <recieved-btn-group
            @on-confirm="$emit('confirm-request', person.requestId)"
            @on-decline="$emit('decline-request', person.requestId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserStatus from "../UserStatus.vue";
import AddBtnGroup from "./AddBtnGroup.vue";
import RecievedBtnGroup from "./RecievedBtnGroup.vue";
import SentBtnGroup from "./SentBtnGroup.vue";
export default {
  components: { UserStatus, SentBtnGroup, RecievedBtnGroup, AddBtnGroup },
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
