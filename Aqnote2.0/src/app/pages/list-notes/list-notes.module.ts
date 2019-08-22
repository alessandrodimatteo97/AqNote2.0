import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {TabsPageModule} from '../tabs/tabs.module';
import { IonicModule } from '@ionic/angular';

import { ListNotesPage } from './list-notes.page';

const routes: Routes = [
  {
    path: '',
    component: ListNotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      TabsPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListNotesPage]
})
export class ListNotesPageModule {}
