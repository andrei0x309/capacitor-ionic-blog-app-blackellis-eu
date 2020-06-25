import { Injectable } from '@angular/core';
import { Storage }from '@ionic/storage';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;





interface CatInterface {
   [key: string]: { title: string, id: number };
 }
 
 interface LastPostInterface {
   time: number,
   reqStatus: number,
   jsonFeed: any

}

interface InCatLatestPostIface {
  [catId: number]: LastPostInterface;
}


@Injectable({ providedIn: 'root', })
export class GlobalStore {


   
   private blogDomain: string = "blackellis.eu";
   private twitterAuthorUrl: string = "https://twitter.com/blackellisN";
   
   // Blog categories
   private categories: CatInterface = {
      general: { title: 'General', id: 1 },
      blogTricks: { title: 'Blogging tools & tricks', id: 30 },
      reviews: { title: 'Reviews', id: 38 },
      skinCare: { title: 'SkinCare', id: 29 }
    };;
   // Cache Posts and category posts 
   private LASTPOSTS: LastPostInterface = { time: 0, jsonFeed: [], reqStatus: 0 };
   private inCatLASTPOSTS: InCatLatestPostIface = 
   {
    1:   { time: 0, jsonFeed: [], reqStatus: 0 },
    30:  { time: 0, jsonFeed: [], reqStatus: 0 },
    38:  { time: 0, jsonFeed: [], reqStatus: 0 },
    29:  { time: 0, jsonFeed: [], reqStatus: 0 },
   };;


 
   getBlogDomain(){
      return this.blogDomain;
   }

   getTwitterAuthorUrl(){
      return this.twitterAuthorUrl;
   }
   // Home Page Cache
   getLastPostReqStatus() {
      return this.LASTPOSTS.reqStatus;
   }

   getLastPostJsonFeed() {
      return this.LASTPOSTS.jsonFeed;
   }

   getLastPostTime() {
      return this.LASTPOSTS.time;
   }

   setLastPostReqStatus(status: number) {
      this.LASTPOSTS.reqStatus = status;
   }

   setLastPostJsonFeed(feed: any) {
      this.LASTPOSTS.jsonFeed = feed;
   }

   setLastPostTime(time: number) {
      this.LASTPOSTS.time = time;
   }


   // Cat Cache

   catGetLastPostReqStatus(catId) {
      return this.inCatLASTPOSTS[catId].reqStatus;
   }

   catGetLastPostJsonFeed(catId) {
      return this.inCatLASTPOSTS[catId].jsonFeed;
   }

   catGetLastPostTime(catId) {
      return this.inCatLASTPOSTS[catId].time;
   }

   catSetLastPostReqStatus(catId:number, status: number) {
      this.inCatLASTPOSTS[catId].reqStatus = status;
   }

   catSetLastPostJsonFeed(catId:number, feed: any) {
      this.inCatLASTPOSTS[catId].jsonFeed = feed;
   }

   catSetLastPostTime(catId:number, time: number) {
      this.inCatLASTPOSTS[catId].time = time;
   }


   getBlogCatByid(catid){
      catid = parseInt(catid);
      let catMap = new Map <Number ,any>();

      for (const key in this.categories) {
         if (this.categories.hasOwnProperty(key)) {
            const element = this.categories[key];
            catMap.set(element.id, element);
         }
         
      }
      if (catMap.has(catid)){
         return catMap.get(catid);
      }else{
         return 0;
      }
   }

   getBlogCategories(){
      return this.categories;
   }


   async openAuthorTwitter(){
      await Browser.open({ url: this.twitterAuthorUrl });
   }


     constructor(private storage: Storage) {

   

    const dbValueOrDefault= (val, defaultVal) => {
         if(val != null) {
            return val;
         }else {
            return defaultVal;
         }
    } 

    const getHomePostCache = async () => {
      this.LASTPOSTS.time = dbValueOrDefault(await this.storage.get('lastPost_time'), 0)
      this.LASTPOSTS.jsonFeed  = dbValueOrDefault(await this.storage.get('lastPost_JsonFeed'), []);
      this.LASTPOSTS.reqStatus = dbValueOrDefault(await this.storage.get('lastPost_reqStatus'), 0);
    }   

    const getCatsPostCache = async () => {
      
      for(const key in this.categories){
         const catId = this.categories[key].id;
         this.catSetLastPostTime(catId,  dbValueOrDefault(await this.storage.get(`catid_${catId}_lastPost_time`), 0))
         this.catSetLastPostJsonFeed(catId,  dbValueOrDefault(await this.storage.get(`catid_${catId}lastPost_JsonFeed`), []))
         this.catSetLastPostReqStatus(catId,  dbValueOrDefault(await this.storage.get(`catid_${catId}lastPost_reqStatus`), 0))
      }
    }   


    this.storage.ready().then(() => {
      
      getHomePostCache();
      
      getCatsPostCache();

      });


   }


}


