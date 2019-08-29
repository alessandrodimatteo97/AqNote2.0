import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64EncodePage } from './base64-encode.page';

describe('Base64EncodePage', () => {
  let component: Base64EncodePage;
  let fixture: ComponentFixture<Base64EncodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Base64EncodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Base64EncodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
