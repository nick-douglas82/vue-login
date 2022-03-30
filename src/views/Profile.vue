<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../store";
import { updateUser } from "../lib/api";
import Header from "../components/Header.vue";

const userStore = useUserStore();

const name = ref(userStore.getUser.name);
const email = ref(userStore.getUser.email);

const updateProfile = () => {
  if (userStore.getUser.id) {
    updateUser(name.value, email.value, userStore.getUser.id);
  }
};
</script>

<template>
  <Header />
  <main class="flex-1">
    <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div class="pt-10 pb-16">
        <div class="px-4 sm:px-6 md:px-0">
          <h1 class="text-3xl font-extrabold text-gray-900">Profile</h1>
        </div>
        <div class="px-4 sm:px-6 md:px-0">
          <div class="py-6">
            <!-- Description list with inline editing -->
            <div class="mt-10 divide-y divide-gray-200">
              <div class="space-y-1">
                <p class="max-w-2xl text-sm text-gray-500">
                  This information will be displayed publicly so be careful what you
                  share.
                </p>
              </div>
              <div class="mt-6">
                <dl class="divide-y divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="flex items-center text-sm font-medium text-gray-500">
                      Name
                    </dt>
                    <dd class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="flex-grow">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          v-model="name"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </span>
                      <span class="flex flex-shrink-0 ml-4">
                        <button
                          @click="updateProfile()"
                          type="button"
                          class="font-medium text-indigo-500 rounded-md hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt class="text-sm font-medium text-gray-500">Photo</dt>
                    <dd class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="flex-grow">
                        <img
                          class="w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </span>
                    </dd>
                  </div>
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                    <dt class="flex items-center text-sm font-medium text-gray-500">
                      Email
                    </dt>
                    <dd class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="flex-grow">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          v-model="email"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="you@example.com"
                        />
                      </span>
                      <span class="flex flex-shrink-0 ml-4">
                        <button
                          @click="updateProfile()"
                          type="button"
                          class="font-medium text-indigo-500 rounded-md hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                        >
                          Update
                        </button>
                      </span>
                    </dd>
                  </div>
                  <div
                    class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                  >
                    <dt class="text-sm font-medium text-gray-500">Job title</dt>
                    <dd class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="flex-grow">Senior Web Developer</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
