<template>
  <div>
    <div class="flex flex-col flex-grow mx-auto max-w-6xl">
      <div class="flex flex-grow flex-row w-full text-left space-x-4">
        <p class="flex-grow text-xl font-semibold">Invitations</p>
        <button
          class="flex flex-row items-center space-x-2 border border-gray-400 rounded-md p-2 focus:outline-none"
          @click="showCreateInvitationModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="invisible w-0 h-0 sm:visible sm:w-full sm:h-full">Create an invitation</p>
          <p class="sm:hidden">Create</p>
        </button>
      </div>
      <div
        v-if="!invitations.length"
        class="flex flex-col w-full mt-4 max-h-full"
      >
        <p class="mt-16 flex-grow text-md">No invitation found</p>
      </div>
      <div
        v-if="invitations.length"
        class="flex flex-col w-full mt-6 max-h-full"
      >
        <div class="border rounded border-gray-200 bg-white">
          <ul class="rounded divide-y divide-gray-200">
            <li
              v-for="invitation in invitations"
              v-bind:key="invitation.id"
              class="flex flex-row items-center h-24 p-6 py-8"
            >
              <div class="flex-grow flex-col mr-4">
                <div class="flex items-center space-x-4">
                  <p class="text-left text-md font-semibold">
                    {{ invitation.id }}
                  </p>
                  <button
                    @click="copyToClipboard(invitation.id)"
                    class="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                  </button>
                </div>
                <div class="flex flex-row items-center">
                  <p
                    v-if="invitation.player !== null"
                    class="text-left text-sm"
                  >
                    Linked player: {{ invitation.player.name }}
                  </p>
                  <svg
                    v-if="invitation.isAdmin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="ml-1 mt-0.5 w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <p class="text-left text-sm">
                  Valid until:
                  {{ new Date(invitation.validUntil).toLocaleString() }}
                </p>
              </div>
              <div class="flex items-center space-x-4">
                <button
                  @click="deleteInvitation(invitation.id)"
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

    <InvitationCreationModal
      v-show="isCreateInvitationModalVisible"
      @close="closeCreateInvitationModal"
      @save="createInvitation"
      ref="playerCreationModal"
      v-bind.sync="invitation"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import InvitationCreationModal from "./modal/InvitationCreationModal";

export default {
  name: "Invitations",
  components: {
    InvitationCreationModal,
  },
  data() {
    return {
      hostUrl: process.env.VUE_APP_HOST_URL || "http://localhost:8080/",
      invitations: [],
      invitation: {
        player: null,
        isAdmin: false,
      },
      isCreateInvitationModalVisible: false,
    };
  },
  beforeMount() {
    this.apiFindInvitations().then((data) => {
      this.invitations = data.findInvitations;
    });
  },
  methods: {
    ...mapActions([
      "apiFindInvitations",
      "apiCreateInvitation",
      "apiDeleteInvitation",
    ]),
    createInvitation: function () {
      this.apiCreateInvitation({
        player: this.invitation.player.id,
        isAdmin: this.invitation.isAdmin,
      }).then(() => {
        this.isCreateInvitationModalVisible = false;
        this.apiFindInvitations().then((data) => {
          this.invitations = data.findInvitations;
        });
      });
    },
    deleteInvitation: function (invitationId) {
      this.apiDeleteInvitation(invitationId).then(() => {
        this.apiFindInvitations().then((data) => {
          this.invitations = data.findInvitations;
        });
      });
    },
    copyToClipboard: async function (invitationId) {
      await navigator.clipboard.writeText(
        this.hostUrl +
          (this.hostUrl.endsWith("/") ? "" : "/") +
          "register?id=" +
          invitationId
      );
      alert("Registration URL copied to clipboard");
    },
    showCreateInvitationModal: function () {
      this.isCreateInvitationModalVisible = true;
    },
    closeCreateInvitationModal: function () {
      this.invitation.player = null;
      this.isCreateInvitationModalVisible = false;
    },
  },
};
</script>
