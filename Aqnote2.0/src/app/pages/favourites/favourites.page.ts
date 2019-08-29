import { Component, OnInit } from '@angular/core';
import {MenuController, ModalController} from '@ionic/angular';
import {SubjectService} from '../../services/subject.service';
import {Observable} from 'rxjs';
import {Subject} from '../../model/Subject.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
    private d$: Observable<Subject[]>;

    constructor(private menu: MenuController, private modalController: ModalController, private subjectService: SubjectService) {
    }


    ngOnInit(): void {
    this.d$ = this.subjectService.listFavourite();
    }
}
