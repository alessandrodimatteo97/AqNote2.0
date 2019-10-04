import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MediaPreviewDirective} from '../../media-preview.directive';
import { IonicModule } from '@ionic/angular';
import { UploadPhotoPage } from './upload-photo.page';
import {FileUploadModule} from 'ng2-file-upload';

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
    FileUploadModule
  ],
  declarations: [UploadPhotoPage, MediaPreviewDirective]
})
export class UploadPhotoPageModule {}
