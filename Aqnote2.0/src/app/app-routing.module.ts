import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './pages/splash-screen/splash-screen.module#SplashScreenPageModule' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
    { path: 'favourites', loadChildren: './pages/favourites/favourites.module#FavouritesPageModule' },
    { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
    { path: 'note-detail', loadChildren: './pages/note-detail/note-detail.module#NoteDetailPageModule' },
    { path: 'list-notes/:id', loadChildren: './pages/list-notes/list-notes.module#ListNotesPageModule' },
    { path: 'upload-note', loadChildren: './pages/upload-note/upload-note.module#UploadNotePageModule' },
    { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
    {path: 'sign-up-page', loadChildren: './pages/sign-up-page/sign-up-page.module#SignUpPagePageModule'},
    {path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule'},
    { path: 'upload-photo/:idS/:idN', loadChildren: './pages/upload-photo/upload-photo.module#UploadPhotoPageModule' },
    { path: 'subjects', loadChildren: './pages/subjects/subjects.module#SubjectsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
