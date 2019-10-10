import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

  constructor(private modalController: ModalController, private sanitizer: DomSanitizer ) { }
  @Input() value;
  @Input() otherValue;
  @ViewChild('slider', {static: false, read: ElementRef })slider: ElementRef;
  public message: string;  img: any = [];
  index: number;
  sliderOpts = {
    initialSlide: null,
    zoom: {
      maxRatio: 5,
    }
  };

  ngOnInit() {
   // this.massTimingsHtml = this.getInnerHTMLValue();
    this.img = this.value;
   this.sliderOpts.initialSlide = this.otherValue;
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalController.dismiss();
  }

  transform(c) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(c);
  }

}
