import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEcrtComponent } from './details-ecrt.component';

describe('DetailsEcrtComponent', () => {
  let component: DetailsEcrtComponent;
  let fixture: ComponentFixture<DetailsEcrtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEcrtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEcrtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
