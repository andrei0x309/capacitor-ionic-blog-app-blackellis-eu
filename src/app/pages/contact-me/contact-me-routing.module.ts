import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactMe } from './contact-me';


const routes: Routes = [
  {
    path: '',
    component: ContactMe,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactMeRoutingModule {}