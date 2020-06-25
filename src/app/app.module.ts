import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { RouteReuseStrategy } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppMenu } from './menu.component'



@NgModule({
  declarations: [AppComponent,AppMenu],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    IonicStorageModule.forRoot({
    name: '__appDb',
       driverOrder: ['indexeddb',  'websql', 'localstorage',]
  }) ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
