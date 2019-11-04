import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {TabsPageModule} from '../tabs/tabs.module';
import { IonicModule } from '@ionic/angular';
import { NoteDetailPage } from './note-detail.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {createTranslateLoader} from '../../app.module';


const routes: Routes = [
  {
    path: '',
    component: NoteDetailPage
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
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [NoteDetailPage]
})
export class NoteDetailPageModule {}
