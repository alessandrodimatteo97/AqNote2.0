import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {TabsPageModule} from '../tabs/tabs.module';
import { IonicModule } from '@ionic/angular';
import { NoteDetailPage } from './note-detail.page';


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

        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  declarations: [NoteDetailPage]
})
export class NoteDetailPageModule {}
