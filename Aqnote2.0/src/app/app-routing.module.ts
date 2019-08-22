import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'favourites', loadChildren: './pages/favourites/favourites.module#FavouritesPageModule' },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'note-detail', loadChildren: './pages/note-detail/note-detail.module#NoteDetailPageModule' },
  { path: 'list-notes', loadChildren: './pages/list-notes/list-notes.module#ListNotesPageModule' },
  { path: 'upload-note', loadChildren: './pages/upload-note/upload-note.module#UploadNotePageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
