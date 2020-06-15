/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditTascaComponent } from './edit-tasca.component';

describe('EditTascaComponent', () => {
  let component: EditTascaComponent;
  let fixture: ComponentFixture<EditTascaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTascaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTascaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
