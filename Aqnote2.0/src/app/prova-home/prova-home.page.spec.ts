import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvaHomePage } from './prova-home.page';

describe('ProvaHomePage', () => {
  let component: ProvaHomePage;
  let fixture: ComponentFixture<ProvaHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvaHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvaHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
