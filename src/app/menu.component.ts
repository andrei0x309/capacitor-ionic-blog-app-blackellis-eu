import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { GlobalStore } from "src/app/store/globalStorage.service"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.template.html',
  styleUrls: ['./menu.component.scss'],
})

export class AppMenu {

public categories = this.globalStore.getBlogCategories();


constructor(private menu: MenuController,
            public globalStore: GlobalStore) {

              

 }

 public keepOriginalOrder = (a, b) => a.key

  async isOpenFirst(){
     return await this.menu.isOpen('first');
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async closeFirst(){
   await this.menu.close('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}