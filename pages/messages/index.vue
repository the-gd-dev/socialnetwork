<template>
  <div class="messages rounded-lg w-full flex flex-col justify-center xl:pl-4 mt-2">
    <div class="w-full">
      <div class="flex flex-col bg-gray-100 shadow-md border border-gray-200">
        <div class="flex message-header justify-between p-2 px-3">
          <div class="text-lg text-gray-800 font-semibold">Messages</div>
          <div class="flex flex-col justify-end" v-if="selectedUser.name">
            <div class="flex items-center space-x-2">
              <div class="text-md text-gray-800 font-semibold">
                {{ selectedUser.name }}
              </div>
              <div class="user-status mt-1">
                <user-status :status="selectedUser.status" />
              </div>
            </div>
            <div class="text-sm text-gray-700 text-right">5 min ago</div>
          </div>
        </div>
        <horizontal-bar :height="1" />
        <div class="message-content flex">
          <div class="w-1/4">
            <div class="buddies-load" v-if="loading">
              <person-skeleton v-for="p in 12" :key="p" />
            </div>
            <div class="buddies" v-else>
              <person
                :statusOrMessage="'hiee'"
                :noLinkToProfile="true"
                @person-clicked="messageToHandler"
                v-for="person in users"
                :key="person.id"
                :person="person"
              />
            </div>
          </div>
          <div class="w-3/4 bg-white flex flex-col items-baseline">
            <div class="messages-wrapper flex flex-col w-full mt-auto">
              <div
                class="messages-container flex flex-col w-full py-2 px-4 mb-0"
              >
                <div class="message w-full" v-for="i in 8" :key="i">
                  <div
                    v-if="i % 5 == 0"
                    class="flex w-full justify-center sticky top-2"
                  >
                    <div
                      class="time bg-gray-100 text-gray-900 border border-gray-200 rounded-full px-4 mb-2"
                    >
                      10 JAN 2022 12:00 AM
                    </div>
                  </div>
                  <div class="flex w-full justify-between my-2">
                    <div class="w-1/2 flex justify-start">
                      <div
                        v-if="i % 2 === 0"
                        class="message-wrap flex flex-wrap w-1/2 flex-col space-y-0 friend-msg"
                      >
                        <div class="flex space-x-1">
                          <profile-picture />
                          <div
                            class="text bg-gray-200 text-gray-800 p-2 px-4 rounded-full"
                          >
                            Hello Dear !!
                          </div>
                        </div>
                        <div class="message-actions flex justify-between">
                          <reactions size="20px" />
                          <button class="text-sm">
                            Reply <Icon name="reply" size="12px" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 flex justify-end">
                      <div
                        v-if="i % 2 !== 0"
                        class="message-wrap flex flex-wrap w-1/2 flex-col space-y-0 my-msg"
                      >
                        <div
                          class="text bg-cyan-400 text-gray-800 p-2 px-4 rounded-full"
                        >
                          Hello Dear !!
                        </div>
                        <div class="message-actions flex justify-between">
                          <button class="text-sm">
                            Reply <Icon name="reply" size="12px" />
                          </button>
                          <reactions />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-message-bar w-full">
                <form @submit.prevent="false">
                  <div class="flex border border-gray-200 rounded-full">
                    <div class="w-1/6">
                      <button
                        type="button"
                        class="flex rounded-full space-x-1 w-full justify-center items-center bg-gray-200 h-10 px-4 text-gray-800"
                      >
                        <div>Sticker</div>
                        <div><Icon name="face-smile" /></div>
                      </button>
                    </div>
                    <div class="form-group w-4/6">
                      <input
                        type="text"
                        placeholder="write a message..."
                        class="h-10 px-2 w-full"
                      />
                    </div>
                    <div class="w-1/6">
                      <button
                        class="flex rounded-full space-x-1 w-full justify-center items-center bg-cyan-600 hover:bg-cyan-800 h-10 px-4 text-white"
                      >
                        <div>Send</div>
                        <div><Icon name="send" /></div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import humanReadTime from "~/helpers/humanReadTime";
import HorizontalBar from "~/components/HorizontalBar.vue";
import Person from "~/components/Person/Person.vue";
import ProfilePicture from "~/components/ProfilePicture.vue";
import Reactions from "~/components/Reactions.vue";
import people from "~/data/people";
import PersonSkeleton from "~/components/Person/PersonSkeleton.vue";
import UserStatus from "~/components/UserStatus.vue";
export default {
  name: "Messages",
  layout: "auth",
  components: {
    HorizontalBar,
    Person,
    Reactions,
    ProfilePicture,
    PersonSkeleton,
    UserStatus,
  },
  data() {
    return {
      users: [],
      loading: false,
      selectedUser: {},
    };
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.users = people;
      this.selectedUser = people[0];
      this.loading = false;
    }, 2000);
  },
  methods: {
    messageToHandler(person) {
      this.users.map((u) => {
        if (u.id === person.id) {
          u.selected = true;
          this.selectedUser = u;
        } else {
          u.selected = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.messages-container {
  max-height: 700px;
  overflow: hidden;
  overflow-y: auto;
}
.buddies {
  max-height: 750px;
  overflow-y: auto;
}
.messages {
  max-height: 830px;
  overflow: hidden;
}
.buddies::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 5px;
}
.buddies::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: #c3c3c3;
}
.buddies::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: #575757;
  border-radius: 8px;
}
</style>
