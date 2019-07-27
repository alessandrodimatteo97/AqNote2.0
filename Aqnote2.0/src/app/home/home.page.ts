import { Component } from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import { IonTabs} from '@ionic/angular';
import { ViewChild} from '@angular/core';
import {ImageModalPage} from '../image-modal/image-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };
  private activeTabName: string;
  segmentChanged(ev: any) {
    console.log(ev['detail']['value']);
  }
  getSelectedTab(): void {
    console.log('this');
    //this.activeTabName = this.tabs.getSelected();
  }
  constructor(private menu: MenuController, private modalController: ModalController) { }
  openPreview(img) {
    this.modalController.create({
      component: ImageModalPage,
      componentProps: {
        img: img
      }
    }).then(modal => {
      modal.present();
    });
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


}


