import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'ng2-file-upload';
import {MyCommonModule} from '../../my-common/my-common.module';
import { IonicModule } from '@ionic/angular';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { UserProfilePage } from './user-profile.page';
import {createTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FileUploadModule,
    MyCommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
