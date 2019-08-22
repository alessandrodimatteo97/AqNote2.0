import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {ImageModalPage} from '../image-modal/image-modal.page';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

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
    // this.activeTabName = this.tabs.getSelected();
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

  ngOnInit(): void {
  }

}
