import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Platform , AlertController } from '@ionic/angular';
import { GlobalStore } from './store/globalStorage.service'
import { AppMenu } from "./menu.component"

import { Plugins } from '@capacitor/core';

 
const { Keyboard, Device } = Plugins;

 
//import { Plugins } from '@capacitor/core';
//const { LocalNotifications } = Plugins;
//import BackgroundFetch from "cordova-plugin-background-fetch";
 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  private backbtn = this.platform.backButton;
  
  private closeAlert: HTMLIonAlertElement;
  private isKeyboardOpen = false;
  private isCloseAlertOpen = false;
  

  @ViewChild(AppMenu, { static: true }) appMenu;

  constructor(
    private alertCtrl: AlertController,
    private _location: Location,
    private platform: Platform,
    private globalstore: GlobalStore,
    //private backgroundFetch: BackgroundFetch

  ) {

    /*
    this.platform.keyboardDidShow.subscribe(ev => {
      this.isKeyboardOpen = true;
    });
  
    this.platform.keyboardDidHide.subscribe(() => {
      this.isKeyboardOpen = false;
    });
*/

    this.initializeApp();
  }

  initializeApp() {
     this.platform.ready().then(async () => {

      this.backbtn.subscribeWithPriority(999990,  async function () {
        console.log(this.appMenu.isOpenFirst());
        if(this.isKeyboardOpen){
          Keyboard.hide();
        }else if(await this.appMenu.isOpenFirst()){
          await this.appMenu.closeFirst();
        }else if (this.isCloseAlertOpen){
          (async function() {
          await this.closeAlert.dismiss();
          this.isCloseAlertOpen = false;
        }.bind(this))();
        }
        else if(this._location.path(false) === "/home"){
          (async function() {
            this.closeAlert = await this.alertCtrl.create({
              header: 'Close',
              message: 'Do you want to exit the app?',
              buttons: [
                {
                  text: 'Yes',
                  handler: () => {
                    navigator['app'].exitApp();
                  }
                },
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                    this.isCloseAlertOpen = false;
                  }
                }
              ]
            });
            this.isCloseAlertOpen = true;
            await  this.closeAlert.present();
          }.bind(this))();
        }else{
          this._location.back();
        }
  
      }.bind(this));
  


 /*
    let fetchCallback = function(taskId) {
      console.log('[js] BackgroundFetch event received: ', taskId);
      const notifs = (async _ => { await LocalNotifications.schedule({
        notifications: [
          {
            title: "BlackEllis.EU New Article",
            body: "Bla Bla",
            id: 1,
            schedule: { at: new Date(Date.now() + 1000 * 2) },
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      })();
      BackgroundFetch.finish(taskId);
  };

  let failureCallback = function(error) {
      console.log('- BackgroundFetch failed', error);
  };
  */
/*
  let tasconfig: TaskConfig = {
   periodic: true,
  };
*/
  //BackgroundFetch.scheduleTask()
/*
  BackgroundFetch.configure(fetchCallback, failureCallback, {
      minimumFetchInterval: 15 // <-- default is 15
  });
*/
   




 
            
      
 
/*

const notifs = (async _ => { await LocalNotifications.schedule({
            notifications: [
              {
                title: "BlackEllis.EU New Article",
                body: "Bla Bla",
                id: 1,
                schedule: { at: new Date(Date.now() + 1000 * 2) },
                sound: null,
                attachments: null,
                actionTypeId: "",
                extra: null
              }
            ]
          });
          })();

*/




    });


  }
}
