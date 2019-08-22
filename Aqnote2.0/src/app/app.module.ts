import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImageModalPageModule } from './pages/image-modal/image-modal.module';
import {IonicStorageModule} from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ImageModalPageModule, IonicStorageModule.forRoot({
    name: 'AqNote__db',
    driverOrder: ['indexeddb', 'sqlite', 'websql']
  }),],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ImageModalPageModule, HttpClientModule],
>>>>>>> a00757f06a7c045a5462539fb758bf357fabccd7
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
