import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcrtcomptaComponent } from './ecrtcompta.component';

describe('EcrtcomptaComponent', () => {
  let component: EcrtcomptaComponent;
  let fixture: ComponentFixture<EcrtcomptaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcrtcomptaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcrtcomptaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
