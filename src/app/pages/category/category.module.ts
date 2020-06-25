import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CategoryPage } from './category.page';

 
import { CategoryPageRoutingModule } from './category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
