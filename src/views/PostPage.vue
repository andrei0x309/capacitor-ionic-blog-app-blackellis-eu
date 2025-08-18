<script lang="ts" setup>
import { IonContent, IonPage } from "@ionic/vue";
import { ref, Ref, onMounted } from "vue";
import HeaderBar from "@/components/template/header-bar.vue";
import PostItem from "@/components/post/post.vue";
import type { IPost } from "@/types/common";
import { useMainStore } from "@/store/main";
import { useRouter } from "vue-router";

const post = ref() as Ref<IPost>;
const mainStore = useMainStore();
const router = useRouter();
post.value = mainStore.viewPost as IPost;

onMounted(async () => {
  if (!post.value) {
    router.push("/");
  }
});
</script>

<template>
  <ion-page>
    <HeaderBar :menu="true" :can-go-back="true" />
    <ion-content :fullscreen="false" class="ion-padding mt-4">
      <PostItem v-if="post" :key="post.id" :post="post" :full="true" />
    </ion-content>
  </ion-page>
</template>
