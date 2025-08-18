<script lang="ts" setup>
import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLoading,
  IonIcon,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import HeaderBar from "@/components/template/header-bar.vue";
import { storage } from "@/utils/storage";
import { send } from "ionicons/icons";
import { CONSTANTS } from "@/store/constants";

const loading = ref(false);

const hasSentEmailRecently = ref(false);
const triedToSendEmail = ref(false);
const message = ref("");
const name = ref("");
const errorMsg = ref("");
const success = ref(false);

onMounted(async () => {
  loading.value = true;

  const lastSentEmail = (await storage.get("lastSentEmail")) as number;
  if (lastSentEmail) {
    const now = new Date().getTime();
    const diff = now - lastSentEmail;
    if (diff < 1000 * 60 * 60 * 24) {
      hasSentEmailRecently.value = true;
    }
  }

  loading.value = false;
});

const sendEmail = async () => {
  try {
    console.log("doSendEmail", loading.value, hasSentEmailRecently.value);

    if (hasSentEmailRecently.value) {
      errorMsg.value = "You have already sent an email recently. Please try again later.";
      return false;
    }
    const data = {
      service_id: import.meta.env.VITE_EMAIL_SERVICEID,
      template_id: import.meta.env.VITE_EMAIL_TEMPID,
      user_id: import.meta.env.VITE_EMAIL_PUBID,
      template_params: {
        message: message.value,
        from_name: name.value,
      },
    };
    const api = "https://api.emailjs.com/api/v1.0/email/send";

    const req = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (req.status === 200) {
      await storage.set("lastSentEmail", new Date().getTime());
      hasSentEmailRecently.value = true;
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const doSendEmail = async () => {
  if (loading.value) return;
  errorMsg.value = "";
  triedToSendEmail.value = true;
  if (!message.value || !name.value) {
    errorMsg.value = "Please enter a message and your name.";
    return false;
  }
  loading.value = true;
  success.value = await sendEmail();
  if (success.value) {
    message.value = "";
    name.value = "";
  } else if (!errorMsg.value) {
    errorMsg.value = "There was an error sending your message. Please try again later.";
  }
  loading.value = false;
};

const openSocialProfile = (platform: keyof typeof CONSTANTS.socials) => {
    const platformUrl = CONSTANTS.socials[platform] || '';
    if (platformUrl) {
      window.open(platformUrl, "_blank");
    }
}

</script>

<template>
  <ion-page>
    <HeaderBar :menu="true" />
    <ion-content :fullscreen="false" class="ion-padding mt-4">
      <h1 class="ml-4 my-6 text-[1.8rem]">Contact Page</h1>

      <ion-list>
        <ion-item>
          <ion-input label="Name" placeholder="Enter Name" v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-textarea
            label="Message"
            labelPlacement="floating"
            placeholder="Enter text"
            :rows="4"
            v-model="message"
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-button expand="block" color="secondary" @click="doSendEmail"
            ><ion-icon :icon="send" class="w-5 mr-2" />Send</ion-button
          >
        </ion-item>
      </ion-list>

      <template v-if="triedToSendEmail">
        <div
          v-if="success"
          class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700 mt-4"
          role="alert"
        >
          <svg
            class="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div><span class="font-medium">Success:</span> Your message has been sent.</div>
        </div>
        <div
          v-else-if="errorMsg"
          class="flex bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700 mt-4"
          role="alert"
        >
          <svg
            class="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div><span class="font-medium">Error:</span> {{ errorMsg }}</div>
        </div>
      </template>


       <div class="flex mt-4 w-9/12 mx-auto justify-between">
         
      <svg version="1.1" viewBox="0 0 100 100" class="w-6 h-6" xml:space="preserve" @click="openSocialProfile('pinterest')">
        <path
          d="M83,17.8C74.5,8.9,63.4,4.3,50,4.1C37.7,4.2,26.8,8.6,17.9,17.3C8.9,26,4.3,37,4.1,50c0,0,0,0,0,0c0,9.1,2.5,17.4,7.4,24.9  c4.9,7.4,11.6,13.2,20.1,17.1c0.3,0.1,0.7,0.1,1-0.1c0.3-0.2,0.5-0.5,0.5-0.8l0-4.9c0.1-2.1,0.7-5.3,1.7-9.5c1-4,1.7-6.7,1.9-7.6  c0.7-3,1.7-7.2,3-12.6c0.1-0.2,0-0.5-0.1-0.7c-0.4-0.8-1-2.6-1.5-6.6c0.1-2.7,0.8-5.2,2.1-7.3c1.2-2,3.1-3.1,5.7-3.5  c2,0.1,4.7,0.8,5.1,5.9c-0.1,1.8-0.8,4.5-1.9,8.1c-1.2,3.8-1.9,6.3-2.1,7.6c-0.7,2.5-0.2,4.8,1.5,6.8c1.6,1.9,3.8,2.9,6.5,3.1  c4.3-0.1,8.1-2.6,11.2-7.5c1.7-3,2.9-6.3,3.5-9.7c0.7-3.4,0.7-7.1,0-10.8c-0.7-3.8-2.2-7.1-4.5-9.8c0,0-0.1-0.1-0.1-0.1  c-4.3-3.7-9.5-5.3-15.6-5c-6,0.4-11.3,2.6-15.9,6.6c-2.9,3.2-4.8,7.1-5.7,11.6c-0.9,4.6,0,9.1,2.6,13.3c0.3,0.5,0.5,0.8,0.6,1  c0,0.3,0,1-0.5,2.8c-0.5,1.8-0.9,2.2-0.9,2.2c0,0-0.1,0-0.1,0.1c0,0-0.2,0-0.4-0.1c-2.2-1-3.9-2.4-5.2-4.2c-1.3-1.9-2.1-4-2.5-6.3  c-0.3-2.5-0.4-5-0.3-7.5c0.2-2.5,0.7-5.1,1.4-7.7c3-6.9,8.5-11.9,16.3-14.8c7.8-2.9,16-3.2,24.3-0.8c6.5,2.8,11,7.4,13.6,13.7  c2.5,6.4,2.8,13.4,0.8,20.8c-2.2,7.1-6.4,12.4-12.1,15.7c-5.6,2.8-10.8,3-15.7,0.7c-1.8-1.1-3.1-2.3-3.9-3.5c-0.2-0.3-0.6-0.5-1-0.5  c-0.4,0.1-0.7,0.3-0.8,0.7c-0.7,2.7-1.3,4.7-1.6,6.2c-1.4,5.4-2.6,9.2-3.4,11c-0.8,1.6-1.6,3.1-2.4,4.3c-0.2,0.3-0.2,0.6-0.1,0.9  s0.3,0.5,0.6,0.6c4.3,1.3,8.7,2,13,2c12.4-0.1,23.2-4.6,32.1-13.4C91.1,73.9,95.8,62.9,96,50C95.9,37.5,91.5,26.7,83,17.8z"
          fill="currentColor"
        ></path>
      </svg>

      <svg
      fill="currentColor"
      class="w-6 h-6"
      viewBox="0 0 512 512"
      id="icons"
      xmlns="http://www.w3.org/2000/svg"
      @click="openSocialProfile('tiktok')"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
        ></path>
      </g>
    </svg>

    <svg fill-rule="nonzero"  class="w-6 h-6" fill="currentColor" viewBox="0 0 256 256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
      @click="openSocialProfile('instagram')"
    ><g style="mix-blend-mode: normal" text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero"><g transform="scale(8,8)"><path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path></g></g></svg>
         </div>

      <ion-loading
        :key="`loading-${loading}`"
        :is-open="loading"
        message="Please wait..."
        :duration="5000"
      >
      </ion-loading>
    </ion-content>
  </ion-page>
</template>
