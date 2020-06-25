import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ContactMe } from './contact-me';
import { ContactMeRoutingModule } from './contact-me-routing.module';

@NgModule({
  imports: [
    ContactMeRoutingModule,
    CommonModule,
    IonicModule,
    FormsModule,
  ],
  declarations: [ContactMe]
})
export class ContactMeModule {}
