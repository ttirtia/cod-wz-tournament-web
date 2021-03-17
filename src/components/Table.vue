<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <layout-default>
    <div>
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-gray-900">Tournament table</h1>
        </div>
      </header>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-6 sm:px-0">
            <div class="h-96">
              <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <table class="border-collapse w-full">
                  <thead>
                    <tr>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        Position
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        Team
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        Players
                      </th>
                      <th
                        class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                      >
                        Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="object in teams"
                      v-bind:key="object"
                      class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase font-bold"
                          >Position</span
                        >
                        <span
                          v-bind:class="[
                            object.position == 1
                              ? 'rounded bg-gold py-1 px-3 text-md font-bold'
                              : object.position == 2
                              ? 'rounded bg-silver py-1 px-3 text-md font-bold'
                              : object.position == 3
                              ? 'rounded bg-bronze py-1 px-3 text-md font-bold'
                              : 'rounded py-1 px-3 text-md font-bold',
                          ]"
                          >{{ object.position }}</span
                        >
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >Team</span
                        >
                        {{ object.name }}
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >Players</span
                        >
                        <span
                          v-for="(member, index) in object.members"
                          :key="index"
                        >
                          {{ member.name
                          }}<span v-if="index != object.members.length - 1"
                            >,</span
                          >
                        </span>
                      </td>
                      <td
                        class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                      >
                        <span
                          class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                          >Points</span
                        >
                        {{ object.points }}
                      </td>
                    </tr>

                    <!-- <tr
                    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Position</span
                      >
                      <span
                        class="rounded bg-silver py-1 px-3 text-xs font-bold"
                        >2</span>
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Team</span
                      >
                      German
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Players</span
                      >
                      Joe, William, Averell
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Actions</span
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline"
                        >Edit</a
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline pl-6"
                        >Remove</a
                      >
                    </td>
                  </tr>

                  <tr
                    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Position</span
                      >
                      <span
                        class="rounded bg-bronze py-1 px-3 text-xs font-bold"
                        >3</span>
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Team</span
                      >
                      German
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Players</span
                      >
                      Joe, William, Averell
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Actions</span
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline"
                        >Edit</a
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline pl-6"
                        >Remove</a
                      >
                    </td>
                  </tr>

                  <tr
                    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Position</span
                      >
                      <span
                        class="rounded py-1 px-3 text-xs font-bold"
                        >4</span>
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Team</span
                      >
                      German
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Players</span
                      >
                      Joe, William, Averell
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Actions</span
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline"
                        >Edit</a
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline pl-6"
                        >Remove</a
                      >
                    </td>
                  </tr>

                  <tr
                    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Position</span
                      >
                      <span
                        class="rounded py-1 px-3 text-xs font-bold"
                        >5</span>
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Team</span
                      >
                      German
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Players</span
                      >
                      Joe, William, Averell
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Actions</span
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline"
                        >Edit</a
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline pl-6"
                        >Remove</a
                      >
                    </td>
                  </tr>

                  <tr
                    class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Position</span
                      >
                      <span
                        class="rounded py-1 px-3 text-xs font-bold"
                        >6</span>
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Team</span
                      >
                      German
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Players</span
                      >
                      Joe, William, Averell
                    </td>
                    <td
                      class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
                    >
                      <span
                        class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"
                        >Actions</span
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline"
                        >Edit</a
                      >
                      <a
                        href="#"
                        class="text-blue-400 hover:text-blue-600 underline pl-6"
                        >Remove</a
                      >
                    </td>
                  </tr> -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";

export default {
  name: "Home",
  components: {
    LayoutDefault,
  },
  data() {
    return {
      teams: [
        {
          name: "Les Camas",
          position: 1,
          members: [{ name: "Joe" }, { name: "Averell" }, { name: "Will" }],
          points: 120,
        },
        {
          name: "T-Cube",
          position: 2,
          members: [
            { name: "AlbinoMamba" },
            { name: "Th2ib" },
            { name: "Cavalon" },
          ],
          points: 98,
        },
        {
          name: "Les sous-doués",
          position: 3,
          members: [{ name: "Babaturco" }, { name: "Robin" }, { name: "Nico" }],
          points: 51,
        },
        {
          name: "French Bukkake",
          position: 4,
          members: [{ name: "Laurent" }, { name: "Allan" }, { name: "Loic" }],
          points: 49,
        },
        {
          name: "WAP",
          position: 5,
          members: [{ name: "Kilby" }, { name: "Le N" }, { name: "Jason" }],
          points: 40,
        },
        {
          name: "Les Tarlouzes en folie",
          position: 6,
          members: [
            { name: "Jonathan" },
            { name: "Dylan" },
            { name: "Frederic" },
          ],
          points: 15,
        },
      ],
    };
  },
};
</script>