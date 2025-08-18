<script lang="ts" setup>
import {
  IonContent,
  IonPage,
  IonInfiniteScroll,
    IonInfiniteScrollContent,
    InfiniteScrollCustomEvent
} from "@ionic/vue";
import { ref, Ref, onMounted } from "vue";
import HeaderBar from "@/components/template/header-bar.vue";
import { getLatestPosts } from "@/utils/posts";
import PostItem from "@/components/post/post.vue";
import type { IPost } from "@/types/common";
import { useRoute } from "vue-router";
import { CONSTANTS } from "@/store/constants";
import Loader from "@/components/misc/loader.vue";
import { useMainStore } from "@/store/main";

 
    const posts = ref([]) as Ref<IPost[]>
    const mainStore = useMainStore()
    const loading = ref(false)
    const catParam = useRoute()?.params?.id as string ?? ''
    const catTitle = ref('Latest Articles')
    const loadingMore = ref(false)
    const hasMore = ref(true)
    const page = ref(1)
    if(catParam) {
      catTitle.value = Object.values(CONSTANTS.categories).find(cat => cat.id === Number(catParam))?.title || 'Latest Articles'
    }


    onMounted(async () => {
      loading.value = true
      const latestPosts = await getLatestPosts({
        category: catParam ? catParam : '',
        mainStore
      })
      if(!latestPosts.isError) {
        posts.value = latestPosts.posts as IPost[]
      }
      loading.value = false
    })

    const loadMore = async (ev: InfiniteScrollCustomEvent) => {
      if(loadingMore.value || !hasMore.value) {
        ev.target.complete()
        return
      }
      page.value++
      const newPosts = await getLatestPosts({
        category: catParam ? catParam : '',
        mainStore,
        noCache: true,
        page: page.value
      })
      if(Array.isArray(newPosts.posts)) {
        posts.value = [...posts.value, ...newPosts.posts as IPost[]]
        hasMore.value = newPosts.posts.length > 0
      }
      
      loadingMore.value = false
      ev.target.complete()
    }
 
</script>

<template>
  <ion-page>
    <HeaderBar :menu="true" :can-go-back="!!catParam" />
    <ion-content :fullscreen="false" class="ion-padding mt-4">
        <template v-if="loading">
          <p class="text-center text-[1.2rem] my-5">Loading Articles...</p>
          <Loader :unset="true" />
        </template>
        <template v-else>
        <h1 class="ml-4 my-6 text-[1.8rem]">
        <template v-if="catParam">
          Category: {{ catTitle }}
          </template>
          <template v-else>
          Latest Articles
          </template>
        </h1>
        
          <PostItem v-for="post in posts" :key="post.id" :post="post" :full="false" />
          <IonInfiniteScroll @ionInfinite="loadMore($event)" >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more articles..."
          >
          </IonInfiniteScrollContent>
         </IonInfiniteScroll>
        </template>
    </ion-content>
  </ion-page>
</template>