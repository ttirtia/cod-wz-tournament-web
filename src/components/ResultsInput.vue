<template>
  <layout-default>
    <div class="grid place-items-center">
      <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 class="text-xl font-semibold">
          Hello there 👋,
          <span class="font-normal"
            >please fill in your game information</span
          >
        </h1>
        <form class="mt-6">
          <div class="flex justify-between gap-3">
            <span class="w-1/2">
              <label
                for="position"
                class="block text-xs font-semibold text-gray-600 uppercase"
                >Position</label
              >
              <input
                id="position"
                type="number"
                name="position"
                placeholder="Position"
                autocomplete="cc-number"
                class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
            <span class="w-1/2">
              <label
                for="kills"
                class="block text-xs font-semibold text-gray-600 uppercase"
                >Kills</label
              >
              <input
                id="kills"
                type="number"
                name="kills"
                placeholder="Kills"
                autocomplete="cc-number"
                class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <div class="flex justify-between gap-3">
            <button
              type="submit"
              class="w-full px-3 py-2 mt-4 rounded-md font-medium tracking-widest text-white shadow-lg focus:outline-none bg-gray-900"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from "../layouts/LayoutDefault.vue";

export default {
  name: "Results",
  components: {
    LayoutDefault,
  }
};
</script>