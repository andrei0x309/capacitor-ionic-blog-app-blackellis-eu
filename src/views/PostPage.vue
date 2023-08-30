<script lang="ts">
import {
  IonContent,
  IonPage,
  IonItem,
} from "@ionic/vue";
import { defineComponent, ref, Ref, shallowRef, onMounted, PropType } from "vue";
import HeaderBar from "@/components/template/header-bar.vue";
import PostItem from "@/components/post/post.vue";
import type { IPost } from "@/types/common";
import Loader from "@/components/misc/loader.vue";
import { useMainStore } from "@/store/main";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PostPage",
  components: {
    IonContent,
    IonPage,
    IonItem,
    HeaderBar,
    PostItem,
    Loader
  },
  setup () {
    
    const post = ref() as Ref<IPost>
    const mainStore = useMainStore()
    const router = useRouter()
    post.value = mainStore.viewPost as IPost
    
    const loading = ref(false)
   

    onMounted(async () => {
        if(!post.value) {
            router.push('/')
        }
    })


    return {
      post,
      loading
    }

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