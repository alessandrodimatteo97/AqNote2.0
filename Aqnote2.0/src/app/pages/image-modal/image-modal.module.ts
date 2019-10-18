import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ImageModalPage } from './image-modal.page';
import {MyCommonModule} from '../../my-common/my-common.module';

const routes: Routes = [
  {
    path: '',
    component: ImageModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
      MyCommonModule
  ],
  declarations: [ImageModalPage]
})
export class ImageModalPageModule {}
