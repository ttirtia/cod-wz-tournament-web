<template>
  <layout-admin>
    <div>
      <div class="flex flex-col flex-grow mx-auto max-w-6xl">
        <div class="flex flex-grow flex-row w-full text-left space-x-4">
          <p class="flex-grow text-xl font-semibold">Users</p>
        </div>
        <div v-if="notFound" class="flex flex-col w-full mt-4 max-h-full">
          <p class="mt-16 flex-grow text-md">No user found</p>
        </div>
        <div v-else-if="users.length" class="flex flex-col w-full mt-6 max-h-full">
          <div class="border rounded border-gray-200 bg-white">
            <ul class="rounded divide-y divide-gray-200">
              <li
                v-for="user in users"
                v-bind:key="user.id"
                class="flex flex-row items-center h-12 p-6 py-8"
              >
                <div class="flex-grow flex-col mr-4">
                  <div class="flex items-center">
                    <p class="text-left text-md font-semibold">
                      {{ user.username }}
                    </p>
                    <svg
                      v-if="user.isAdmin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="ml-1 mt-1 w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <p v-if="user.player !== null" class="text-left text-sm">
                    Player: {{ user.player.name }}
                  </p>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    @click="showUserEditionModal(user)"
                    class="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-7 h-7"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <UserEditionModal
        v-if="isUserEditionModalVisible"
        v-show="isUserEditionModalVisible"
        @close="closeUserEditionModal"
        @save="updateUser"
        ref="userEditionModal"
        v-bind.sync="editedUser"
      />
    </div>
  </layout-admin>
</template>

<script>
import { mapActions } from "vuex";
import UserEditionModal from "./modal/UserEditionModal";
import LayoutAdmin from "../../layouts/LayoutAdmin.vue";

export default {
  name: "Users",
  components: {
    UserEditionModal,
    LayoutAdmin,
  },
  data() {
    return {
      notFound: false,
      users: [],
      editedUser: null,
      isUserEditionModalVisible: false,
    };
  },
  beforeMount() {
    this.apiFindUsers().then((data) => {
      this.users = data.findUsers;
      this.notFound = this.users.length === 0;
    });
  },
  methods: {
    ...mapActions(["apiFindUsers", "apiDeleteUser", "apiUpdateUser"]),
    updateUser: function () {
      this.apiUpdateUser({
        id: this.editedUser.id,
        user: {
          isAdmin: this.editedUser.isAdmin,
          player:
            this.editedUser.player === null ? null : this.editedUser.player.id,
        },
      }).then(() => {
        this.editedUser = null;
        this.isUserEditionModalVisible = false;
        this.apiFindUsers().then((data) => {
          this.users = data.findUsers;
        });
      });
    },
    deleteUser: function (userId) {
      this.apiDeleteUser(userId).then(() => {
        this.apiFindUsers().then((data) => {
          this.users = data.findUsers;
          this.notFound = this.users.length === 0;
        });
      });
    },
    showUserEditionModal: function (user) {
      this.editedUser = user;
      this.isUserEditionModalVisible = true;
    },
    closeUserEditionModal: function () {
      this.editedUser = null;
      this.isUserEditionModalVisible = false;
    },
  },
};
</script>
