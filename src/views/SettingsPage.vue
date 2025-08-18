<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Capacitor } from "@capacitor/core";
import { getOption, setOption, allKeys } from "@/store/preference-storage";
import { BackgroundRunner } from "@capacitor/background-runner";
import HeaderBar from "@/components/template/header-bar.vue";

import { IonContent, IonPage, IonItem, IonLabel, IonList, IonToggle, IonButton } from "@ionic/vue";


const TESTING_NOTIFICATION = ref(false);
const enableNotificationNewArticle = ref(false);
const isDevice = ref(Capacitor.getPlatform() !== "web");
const keyToggleEnableNotificationNewArticle = ref(1);

const setToogleToFalse = () => {
  enableNotificationNewArticle.value = false
  keyToggleEnableNotificationNewArticle.value++
}

const changeNotification = async () => {
  try {
    const permissions = await BackgroundRunner.checkPermissions()
     if (permissions.notifications !== "granted") {
      const result = await BackgroundRunner.requestPermissions({
        apis: ["notifications"],
      })
      if (result.notifications !== "granted") {
         setOption("enableNotificationNewArticle", false)
         setToogleToFalse()
        return
      }
    }
  setOption("enableNotificationNewArticle", !enableNotificationNewArticle.value);
  } catch (error) {
    console.log(error);
  }
};

const testNotification = async () => {
  console.log("KV keys", JSON.stringify(await allKeys()));

  await BackgroundRunner.dispatchEvent({
        label: "app.blackellis.eu.background.task",
        event: "checkLastPost",
        details: {
          value: "test",
        },
      });
}

onMounted(async () => {
  const KVenableNotificationNewArticle = await getOption(
    "enableNotificationNewArticle",
    false
  );
  enableNotificationNewArticle.value = KVenableNotificationNewArticle
});
</script>

<template>
  <ion-page>
    <HeaderBar :menu="true" />
    <ion-content :fullscreen="false" class="ion-padding mt-4">
      <ion-item slot="header" color="light">
        <ion-label>Settings</ion-label>
      </ion-item>
      <ion-list>
        <ion-item> Get notifications for new posts. </ion-item>
        <ion-item>
          <ion-label>Enable notifications for new posts</ion-label>
          <ion-toggle
            slot="end"
            aria-label="Enable Feed Personalization"
            :checked="enableNotificationNewArticle"
            :disabled="!isDevice"
            @ion-change="changeNotification"
            :key="keyToggleEnableNotificationNewArticle"
          ></ion-toggle>
        </ion-item>
        <ion-item v-if="TESTING_NOTIFICATION">
          <ion-label>Test notification</ion-label>
          <ion-button slot="end" @click="testNotification">Send</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
