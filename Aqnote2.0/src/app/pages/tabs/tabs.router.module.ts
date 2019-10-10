import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'favourites',
        children: [
          {
            path: '',
            loadChildren: '../favourites/favourites.module#FavouritesPageModule'
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
              }
        ]
      },
          {
            path: 'note-detail/:id',
            children: [
              {
                path: '',
                loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule'
              }
            ]
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
          },
          {
            path: 'upload-photo',
            children: [
              {
                path: '',
                loadChildren: '../upload-photo/upload-photo.module#UploadPhotoPageModule'
              }
            ]
          }
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
  },
  {
    path: '',
    redirectTo: '/tabs/favourites',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/upload-note',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/user-profile',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
