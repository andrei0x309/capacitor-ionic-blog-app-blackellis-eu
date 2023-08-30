<script lang="ts">
import {
  IonContent,
  IonPage,
  IonList,
  IonSelect,
  IonSelectOption,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLoading,
  IonChip,
  IonIcon,
  IonInput,
  IonTextarea,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref, onMounted } from "vue";
import HeaderBar from "@/components/template/header-bar.vue";
import PostItem from "@/components/post/post.vue";
import { storage } from "@/utils/storage";
import { send } from "ionicons/icons";

export default defineComponent({
  name: "ContactPage",
  components: {
    IonContent,
    IonPage,
    IonList,
    IonSelect,
    IonSelectOption,
    IonRefresher,
    IonRefresherContent,
    IonItem,
    IonLoading,
    IonChip,
    HeaderBar,
    PostItem,
    IonTextarea,
    IonInput,
    IonButton,
    IonIcon,
  },
  setup() {
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
        console.log('doSendEmail', loading.value, hasSentEmailRecently.value)

        if (hasSentEmailRecently.value) {
          errorMsg.value =
            "You have already sent an email recently. Please try again later.";
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
        errorMsg.value =
          "There was an error sending your message. Please try again later.";
      }
      loading.value = false;
    };

    return {
      doSendEmail,
      send,
      loading,
      triedToSendEmail,
      errorMsg,
      success,
      name,
        message,
    };
  },
});
</script>

<template>
  <ion-page>
    <HeaderBar :menu="true" />
    <ion-content :fullscreen="false" class="ion-padding mt-4">
      <h1 class="ml-4 my-6 text-[1.8rem]">Contact Page</h1>

      <ion-list>
        <ion-item>
          <ion-input label="Name" placeholder="Enter Name"
          v-model="name"
          ></ion-input>
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
          <ion-button expand="block" color="secondary"
          @click="doSendEmail"
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
