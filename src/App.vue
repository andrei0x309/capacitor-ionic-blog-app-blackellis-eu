<template>
  <ion-app id="root">
    <ion-page>
      <HeaderMenu />
      <ion-router-outlet id="ion-router-outlet" />
    </ion-page>
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet, IonPage } from "@ionic/vue";
import HeaderMenu from "@/components/template/header-menu.vue";
import { storage } from "@/utils/storage";
import { onBeforeMount } from "vue";
import { useMainStore } from "./store/main";
import { App } from "@capacitor/app";
import { useBackButton, useIonRouter } from "@ionic/vue";

 
    const mainStore = useMainStore();
    const ionRouter = useIonRouter();
    useBackButton(90, () => {
      if (ionRouter.canGoBack()) {
        ionRouter.back();
      } else {
        App.minimizeApp();
      }
    });

    onBeforeMount(async () => {
      const postStorage = await storage.get("postStorage");
      if (postStorage) {
        try {
          mainStore.postStorage = JSON.parse(postStorage);
        } catch (error) {
        }
      }
    });
 
</script>

<style lang="scss">
html {
  --glass-menu-bg: #fafafa7a;
  --glassTxt: #222;
  --post-card-bg: #f9f9f93b;
}

html.dark,
body.dark {
  --glassTxt: aliceblue;
  --glass-menu-bg: #14141463;
  --post-card-bg: #2626263b;
}

.gradient-text {
  background-color: #ca4246;
  background-image: linear-gradient(
    45deg,
    #ca4246 16.666%,
    #e16541 16.666%,
    #e16541 33.333%,
    #f18f43 33.333%,
    #f18f43 50%,
    #8b9862 50%,
    #8b9862 66.666%,
    #476098 66.666%,
    #476098 83.333%,
    #a7489b 83.333%
  );

  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-text-simple-animation-rev 0.75s ease forwards;
}

.gradient-text:hover {
  animation: rainbow-text-simple-animation 0.5s ease-in forwards;
}

@keyframes rainbow-text-simple-animation-rev {
  0% {
    background-size: 650%;
  }
  40% {
    background-size: 650%;
  }
  100% {
    background-size: 100%;
  }
}

@keyframes rainbow-text-simple-animation {
  0% {
    background-size: 100%;
  }
  80% {
    background-size: 650%;
  }
  100% {
    background-size: 650%;
  }
}

.titleToolbar {
  font-weight: bolder;
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  display: inline;
}

@keyframes blink {
  0% {
    opacity: 0.1;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.view-btn {
  font-size: 0.7rem;
  border: 1px solid #949d9d;
  border-radius: 0.3rem;
  padding: 0.1rem 0.2rem;
}
.view-btn:hover {
  background-color: #383838;
}

.glassCard {
  margin-top: 1rem;
  background-color: var(--glass-menu-bg);
  padding: 2rem;
  border-radius: 1rem;
  filter: grayscale(0.1);
  background: linear-gradient(
      234deg,
      rgba(80, 76, 76, 0.1411764706),
      rgba(24, 24, 24, 0.5490196078)
    ),
    linear-gradient(39deg, rgba(98, 92, 92, 0.2117647059), rgba(32, 31, 31, 0.5607843137));
  color: aliceblue;
  box-shadow: 2px 2px #2b2d2e;
}
</style>
