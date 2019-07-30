import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'upload-note', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'image-modal', loadChildren: './image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'favourites', loadChildren: './favourites/favourites.module#FavouritesPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'note-detail', loadChildren: './note-detail/note-detail.module#NoteDetailPageModule' },
  { path: 'list-notes', loadChildren: './list-notes/list-notes.module#ListNotesPageModule' },
  { path: 'upload-note', loadChildren: './upload-note/upload-note.module#UploadNotePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
