<template>

<div class="home-post-entity" padding>
  <h2 class="text-[1.5rem] m-8" v-html="post.title.rendered"></h2>
     <img v-if="featureImage" :src="featureImage" class="w-[80%] h-auto mt-4 mb-4 mx-auto" />
    <div v-if="full" class="post-content" v-html="post.content.rendered"></div>
    <div v-else class="post-content" v-html="post.excerpt.rendered"></div>
    <!-- <ion-icon name="calendar"></ion-icon> -->
     <div class="small-date text-right relative"><ion-icon :icon="calendar" class="w-5 mr-1 relative top-[0.2rem]"/>{{  post.date_gmt.replace('T', ' ')  }}</div>
     <div v-if="!full" class="text-left flax mb-8 ml-2"><button @click="goToPost" class="post-view-btn">
      <ion-icon :icon="play" class="w-5 mr-1 relative top-[0.2rem]"/>
     View</button></div>
     <div v-else >
      <button @click="sharePost" class="m-2 post-view-btn">
      <ion-icon :icon="shareSocial" class="w-5 mr-1 relative top-[0.2rem]"/>
     Share</button>
     <button @click="openPostInBrowser" class="m-2 post-view-btn">
      <ion-icon :icon="openIcon" class="w-5 mr-1 relative top-[0.2rem]"/>
     Open in Browser</button>
     
     </div>
    </div>
    

<!-- <div class="bg-color token-metrics w-full">
  <div class="box">
    <span class="section-title">YUP price</span>
    <template v-if="!dataGecko || !dataSupply">
      <ion-skeleton-text :animated="true"/>
      <span class=""><ion-skeleton-text :animated="true"/></span>
    </template>
    <template v-else>
      <h2>
        {{ `$${dataGecko.value.price}` }}
      </h2>
      <sup :class="`p-1 font-06 ${dataGecko.value.priceChangeRaw < 0 ? 'price-red' : 'price-green'}`">
        {{ dataGecko.value.priceChange }}%
      </sup>
      <span class="block font-088 faded-darker mt-2">{{ `Mcap: $${dataSupply.value.mcap}` }}</span>
    </template>
  </div>
  <div class="box">
    <span class="section-title">Supply</span>
    <template v-if="!dataSupply">
      <ion-skeleton-text :animated="true"/>
      <span class=""><ion-skeleton-text :animated="true"/></span>
    </template>
    <template v-else>
      <h2>
        {{ `${dataSupply.value.supply} YUP` }}
      </h2>
      <span class="block font-088 faded-darker mt-2">{{ `/ ${dataSupply.value.maxSupply} YUP` }}</span>
    </template>
  </div>
  <div class="box">
    <span class="section-title">Total Votes</span>
    <template v-if="!dataActionCount">
      <ion-skeleton-text :animated="true"/>
      <span class=""><ion-skeleton-text :animated="true"/></span>
    </template>
    <template v-else>
      <h2>
        {{ `${dataActionCount.value.actCount} ` }}
      </h2>
      <span class="block font-088 faded-darker mt-2">This month: {{ dataActionCount.value.actCountMonth }}</span>
    </template>
  </div>
  <div class="box">
    <span class="section-title">Daily distribution</span>
    <template v-if="!dataEmissions || !dataGecko">
      <ion-skeleton-text :animated="true"/>
      <span class=""><ion-skeleton-text :animated="true"/></span>
    </template>
    <template v-else>
      <h2>
        {{ `${dataEmissions.value.emissions} YUP` }}
      </h2>
      <span class="block font-088 faded-darker mt-2">{{ `$${dataEmissions.value.emissionsValue}` }}</span>
    </template>
  </div>
</div> -->
</template>

<script lang="ts">
import { IonPage, IonContent, IonSkeletonText, IonIcon } from '@ionic/vue'
import HeaderBar from '@/components/template/header-bar.vue'
import { useMainStore } from '@/store/main'
import { useRouter } from 'vue-router'
import { Share } from '@capacitor/share';


import {
onMounted,
computed,
onUnmounted,
defineComponent,
PropType
} from 'vue'
import type { IPost } from '@/types/common'
import {
calendar,
play,
shareSocial,
open as openIcon
} from "ionicons/icons";
 
export default defineComponent({
name: 'PostItem',
props: {
  post: {
    type: Object as PropType<IPost>,
    required: true,
  },
  full: {
    type: Boolean,
    default: false,
  },
},
components: {IonPage, IonContent, IonSkeletonText, HeaderBar, IonIcon },
setup(props) {
  const mainStore = useMainStore()
  const router = useRouter()

  const featureImage = computed(() => {
    return props.post?._embedded?.['wp:featuredmedia']?.[0]?.source_url
  })
 
  // const showAlertError = (title, message) => {
  //   alertHidden.value = false;
  //   alertTitle.value = title;
  //   alertMessage.value = message;
  //   alertType.value = "error";
  // };

  // const showAlertSuccess = (title, message) => {
  //   alertHidden.value = false;
  //   alertTitle.value = title;
  //   alertMessage.value = message;
  //   alertType.value = "success";
  // };

  onMounted(async () => {
    // do nothing
 
  })

  onUnmounted(() => {
    // do nothing
  })

  const goToPost = () => {
    mainStore.viewPost = props.post
    router.push(`/post`)
  }

  const sharePost = async() => {
    await Share.share({
      url: props.post.link,
    });
  }

  const openPostInBrowser = () => {
    window.open(props.post.link, '_blank')
  }

  return {
    calendar,
    play,
    featureImage,
    goToPost,
    sharePost,
    openPostInBrowser,
    shareSocial,
    openIcon
  }
}
})
</script>

<style lang="scss">

h2 { 
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

h2.wp-block-heading {
  font-size: 1.4rem;
  color: #db3157;
}

h3 {
  font-size: 1.3rem;
  color: #db3157;
}

.post-content {
  font-size: 1rem;
  line-height: 1.5;
  margin-left: 0.5rem;
  margin-bottom: 0rem;
}


.post-view-btn {
  font-size: 1.1rem;
  border: 1px solid #949d9d;
  border-radius: 0.3rem;
  padding: 0.4rem 0.8rem;
  margin-top: 1.5rem;
  margin: auto;
}
.post-view-btn:hover {
  background-color: #383838;
}

.token-metrics {

--priceGreen: #1bc5bd;
--priceRed: #ff5252;

 margin-top: 10%;
  min-height: 7.4rem;
  color: #818181;
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 0 20rem rgb(219 219 219 / 28%);
  grid-template-columns: 1fr;

h2 {
  display: inline-block;
}

.box {
  border: 1px solid #222;
  padding: 1rem;
}

}

.font-06 {
font-size: 0.75rem;
}

.font-088 {
font-size: 0.88rem;
}

.price-green {
color: var(--priceGreen);
}

.price-red {
color: var(--priceRed);
}

.faded-darker {
color: #ddddddab;
}

.section-title {
color: #c3c3c3;
font-size: 0.9rem;
display: block;
}

ion-skeleton-text {
  --border-radius: 9999px;
  --background: linear-gradient(90deg, #222 25%, #555 50%, #888 75%);
}


html[class='dark'] .o-sklt__item--animated {
background-size: 400% 100%;
}

html[class='dark'] .token-metrics {
color: ghostwhite;
box-shadow: 0.2rem 0.5rem 0rem #1b1b1b;
}
</style>
