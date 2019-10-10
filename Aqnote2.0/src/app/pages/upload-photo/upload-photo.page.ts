import { Component, OnInit} from '@angular/core';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import {ActionSheetController, AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import {concat} from 'rxjs';
import {PhotoService} from '../../services/photo.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ImageModalPage} from '../image-modal/image-modal.page';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.page.html',
  styleUrls: ['./upload-photo.page.scss'],
})
export class UploadPhotoPage implements OnInit {
  public filePreviewPath: SafeUrl = [];
  private idS: string;
  private idN: string;
  private queue = [];
  private url;
  private photos: any[] = [];
  constructor(private router: Router, private alertController: AlertController,
              private uploadingService: PhotoService, private modalCtrl: ModalController,
              private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) {
    this.fileUploader.onAfterAddingFile = (fileItem) => {
      this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    };
    this.activatedRoute.params.subscribe(p => {
      this.idS = p.idS;
      this.idN = p.idN;
    });

  }
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver = false;
  public imagePath;
  imgURL: any;
  public message: string;



  ngOnInit() {
  }




  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      console.log(fileItem.file);
      if (!(this.queue.includes(fileItem))) {
        console.log('non lo include test di cazzo');
        this.queue.push(fileItem);
        return fileItem.file;
      }

    }).filter(r => {
      return typeof r !== 'undefined';
    });
}

  uploadFiles() {

    const files = this.getFiles();
    const requests = [];
    files.forEach((file) => {
      console.log(file.name);
      const formData = new FormData();
      formData.append('file', file.rawFile, file.name);
      console.log(this.idN, this.idS);
      formData.append('idS', this.idS);
      formData.append('idN', this.idN);


      requests.push(this.uploadingService.uploadFormData(formData));


      concat(...requests).subscribe(
           (res) => {
             console.log(res);
           },
           (err) => {
             console.log(err);

           }
       );

    });



  }

  NoteDetail() {
  }

  UploadItem(item) {
 // item.remove();
  this.queue.push(item);
  if (this.queue.includes(item)) {
    console.log('coglione');

  } else {
    }
  const requests = [];
//  console.log(this.fileUploader.queue.);
  const formData = new FormData();
  formData.append('file' , item.file.rawFile, item.file.name);
  console.log(this.idN, this.idS);
  formData.append('idS', this.idS);
  formData.append('idN', this.idN);

  formData.append('description', 'questa è proprio una bella prova del cazzo...');
    // formData.append('info','')
    // formData.append('file' , file.rawFile);
  requests.push(this.uploadingService.uploadFormData(formData));
  concat(...requests).subscribe(
        (res) => {
          console.log(res);


        },
        (err) => {
          console.log(err);

        }
    );

  }

  onDelete(item) {
    if (this.queue.includes(item)) {
     // this.uploadingService.
      console.log(item.file.name);
      const formData = new FormData();
      console.log(this.idN);
      formData.append('idN', this.idN);
      formData.append('imageName', item.file.name);
      this.uploadingService.deletePhoto(formData).subscribe(res => {
        console.log(res);
        const index = this.queue.indexOf(item);
        this.queue.splice(index, 1);

      }); // .subscribe(response => {


    }
    item.remove();


  }

  public async openModal(images, index) {
    console.log(index);
    const modal = await this.modalCtrl.create({
      component: ImageModalPage,
      componentProps: {
        value: images,
        otherValue: index
      }
    });
    modal.present();
  }
}

