import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TabsPageRoutingModule } from './tabs.router.module';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {createTranslateLoader} from '../../app.module';
import {HttpClient} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'favourites',
        children: [
          {
            path: '',
            loadChildren: '../favourites/favourites.module#FavouritesPageModule'
          },
            {
                path: 'note-detail/:id',
                loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule'
            }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          },
          {
            path: 'list-notes/:id',
              children: [
                  {
                      path: '',
                      loadChildren: '../list-notes/list-notes.module#ListNotesPageModule'
                  },
                  {
                      path: 'note-detail/:id',
                      loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule'
                  }
              ]
          },
          {
            path: 'note-detail/:id',
            loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule'
          }
        ]
      }
      ,
      {
        path: 'upload-note',
        children: [
          {
            path: '',
            loadChildren: '../upload-note/upload-note.module#UploadNotePageModule'
          }/*,
          {
            path: 'upload-photo',
            children: [
              {
                path: 'upload-photo',
                loadChildren: '../upload-photo/upload-photo.module#UploadPhotoPageModule'

            ]
          }*/
        ]
      },

      {
        path: 'user-profile',
        children: [
          {
            path: '',
            loadChildren: '../user-profile/user-profile.module#UserProfilePageModule'
          }
        ]
      },
        {
            path: '',
            redirectTo: '/tabs/home',
            pathMatch: 'full'
        }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})



export class TabsPageModule {}
