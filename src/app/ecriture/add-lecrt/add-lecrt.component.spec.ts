import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLecrtComponent } from './add-lecrt.component';

describe('AddLecrtComponent', () => {
  let component: AddLecrtComponent;
  let fixture: ComponentFixture<AddLecrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLecrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLecrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
