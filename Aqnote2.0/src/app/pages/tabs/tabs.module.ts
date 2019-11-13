import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {AuthGuard} from '../../guard/auth.guard';
import { TabsPage } from './tabs.page';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';


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
            loadChildren: '../favourites/favourites.module#FavouritesPageModule',
            canActivate: [AuthGuard]
          },
            {
                path: 'note-detail/:id',
                loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule',
                canActivate: [AuthGuard]
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
            path: 'subjects',
            loadChildren: '../subjects/subjects.module#SubjectsPageModule'
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
            loadChildren: '../upload-note/upload-note.module#UploadNotePageModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'note-detail/:id',
            loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule',
            canActivate: [AuthGuard]
          }
        ]
      },

      {
        path: 'user-profile',
        children: [
          {
            path: '',
            loadChildren: '../user-profile/user-profile.module#UserProfilePageModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'note-detail/:id',
            loadChildren: '../note-detail/note-detail.module#NoteDetailPageModule',
            canActivate: [AuthGuard]
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
