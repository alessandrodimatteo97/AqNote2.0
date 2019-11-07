import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
     { path: '', loadChildren: './pages/splash-screen/splash-screen.module#SplashScreenPageModule' },

    { path: 'prova', loadChildren: './prova-home/prova-home.module#ProvaHomePageModule' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
 // { path: 'image-modal', loadChildren: './pages/image-modal/image-modal.module#ImageModalPageModule' },
  { path: 'favourites', loadChildren: './pages/favourites/favourites.module#FavouritesPageModule' },
  { path: 'user-profile', loadChildren: './pages/user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'note-detail', loadChildren: './pages/note-detail/note-detail.module#NoteDetailPageModule' },
 { path: 'list-notes/:id', loadChildren: './pages/list-notes/list-notes.module#ListNotesPageModule' },
  { path: 'upload-note', loadChildren: './pages/upload-note/upload-note.module#UploadNotePageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'prova-home', loadChildren: './prova-home/prova-home.module#ProvaHomePageModule' },
    {path: 'sign-up-page', loadChildren: './pages/sign-up-page/sign-up-page.module#SignUpPagePageModule'},
    {path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule'},
  { path: 'base64-encode', loadChildren: './base64-encode/base64-encode.module#Base64EncodePageModule' },
 // { path: 'common', loadChildren: './common/common.module#CommonPageModule' },
  { path: 'upload-photo/:idS/:idN', loadChildren: './pages/upload-photo/upload-photo.module#UploadPhotoPageModule' },
 // { path: 'splash-screen', loadChildren: './splash-screen/splash-screen.module#SplashScreenPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
