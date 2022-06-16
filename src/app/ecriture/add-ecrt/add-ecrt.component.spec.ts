import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEcrtComponent } from './add-ecrt.component';

describe('AddEcrtComponent', () => {
  let component: AddEcrtComponent;
  let fixture: ComponentFixture<AddEcrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEcrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEcrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
