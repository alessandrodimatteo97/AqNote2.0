import { Injectable } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {URL} from '../constants';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor(private camera: Camera, public photoService: PhotoService, private http: HttpClient) {  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // Add new photo to gallery
      this.photos.unshift({
        data: 'data:image/jpeg;base64,' + imageData
      }); }, (err) => {
      // Handle error
      console.log('Camera issue: ' + err);
    });
  }

  send(): Observable<Photo> {
    const params = new HttpParams()
        .set('photo', 'assets/images/Logo.jpg');

    const INVIOFOTO = `${URL.UPLOAD_PHOTO}/?${params}`;
    return this.http.get<Photo>(INVIOFOTO);
  }

  public uploadFormData(formData) {
    console.log(formData);
    return this.http.post<any>(`${URL.UPLOAD_PHOTO}/`, formData);

  }
}
export class Photo {
  data: any;
}
