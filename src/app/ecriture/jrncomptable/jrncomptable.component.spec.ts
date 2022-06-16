import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrncomptableComponent } from './jrncomptable.component';

describe('JrncomptableComponent', () => {
  let component: JrncomptableComponent;
  let fixture: ComponentFixture<JrncomptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrncomptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrncomptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
