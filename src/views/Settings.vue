<script setup lang="ts">
import { ref } from "vue";
import Header from "../components/Header.vue";
import WarningModal from "../components/WarningModal.vue";
import { deleteUserAccount } from "../lib/api";

const modalIsActive = ref(false);

const deleteProfile = () => {
  modalIsActive.value = false;
  deleteUserAccount();
};
</script>

<template>
  <Header />
  <main class="flex-1">
    <div class="relative max-w-4xl mx-auto md:px-8 xl:px-0">
      <div class="pt-10 pb-16">
        <div class="px-4 sm:px-6 md:px-0">
          <h1 class="text-3xl font-extrabold text-gray-900">Settings</h1>
        </div>
        <div class="px-4 sm:px-6 md:px-0">
          <div class="py-6">
            <!-- Description list with inline editing -->
            <div class="mt-10 divide-y divide-gray-200">
              <div class="space-y-1">
                <p class="max-w-2xl text-sm text-gray-500">Your account settings.</p>
              </div>
              <div class="mt-6">
                <dl class="divide-y divide-gray-200">
                  <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt class="flex items-center text-sm font-medium text-red-500">
                      Delete account
                    </dt>
                    <dd class="flex mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <span class="flex-grow"> </span>
                      <span class="flex flex-shrink-0 ml-4">
                        <button
                          @click="modalIsActive = true"
                          type="button"
                          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Yes, delete my account
                        </button>
                      </span>
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

  <WarningModal
    :modal-open="modalIsActive"
    @closeModal="modalIsActive = false"
    @deleteConfirmation="deleteProfile"
  />
</template>
