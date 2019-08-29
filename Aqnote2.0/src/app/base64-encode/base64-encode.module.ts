import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Base64EncodePage } from './base64-encode.page';

const routes: Routes = [
  {
    path: '',
    component: Base64EncodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Base64EncodePage]
})
export class Base64EncodePageModule {}
