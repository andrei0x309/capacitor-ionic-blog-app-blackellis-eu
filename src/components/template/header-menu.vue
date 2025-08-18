<script lang="ts" setup>
import {
  IonHeader,
  IonToolbar,
  IonMenu,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonIcon,
  IonItem,
  IonList,
  menuController,
} from "@ionic/vue";
import {
  closeCircleOutline,
  settingsOutline,
  ellipse,
  chevronForward,
  home,
  mail,
} from "ionicons/icons";
import { useRouter } from "vue-router";

import { CONSTANTS } from "@/store/constants";

const router = useRouter();

const goTo = (path: string) => {
  router.push(path);
  menuController.isOpen().then((isOpen) => {
    if (isOpen) {
      menuController.close("menu");
    }
  });
};
</script>

<template>
  <ion-menu menu-id="menu" content-id="ion-router-outlet">
    <ion-header>
      <ion-toolbar>
        <ion-title class="pl-4"
          >Menu
          <ion-menu-toggle
            :auto-hide="false"
            style="position: absolute; right: 2rem; top: 0.2rem"
          >
            <ion-icon :icon="closeCircleOutline" />
          </ion-menu-toggle>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button @click="goTo(`/`)">
          <ion-icon :icon="home" class="w-5 mr-4 ml-4" /> Latest Articles
        </ion-item>
      </ion-list>

      <ion-list class="mt-2">
        <ion-item> <ion-icon :icon="ellipse" class="w-5 mr-4" /> Categories </ion-item>
        <ion-item
          v-for="cat of Object.values(CONSTANTS.categories)"
          button
          @click="goTo(`/category/${cat.id}`)"
        >
          <ion-icon :icon="chevronForward" class="w-5 mr-4 ml-4" /> {{ cat.title }}
        </ion-item>
      </ion-list>

      <ion-list class="mt-2">
        <ion-item button @click="goTo(`/contact`)">
          <ion-icon :icon="mail" class="w-5 mr-4 ml-4" /> Contact
        </ion-item>
      </ion-list>

      <ion-list class="mt-2">
        <ion-item button @click="goTo(`/settings`)">
          <ion-icon :icon="settingsOutline" class="w-5 mr-4 ml-4" /> Settings
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<style></style>
