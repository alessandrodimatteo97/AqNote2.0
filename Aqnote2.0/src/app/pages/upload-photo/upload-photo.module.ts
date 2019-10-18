import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploadPhotoPage } from './upload-photo.page';
import {FileUploadModule} from 'ng2-file-upload';
import {MyCommonModule} from '../../my-common/my-common.module';

const routes: Routes = [
  {
    path: '',
    component: UploadPhotoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    MyCommonModule
  ],
  declarations: [UploadPhotoPage],
})
export class UploadPhotoPageModule {}
