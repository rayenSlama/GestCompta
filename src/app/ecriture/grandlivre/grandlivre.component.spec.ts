import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandlivreComponent } from './grandlivre.component';

describe('GrandlivreComponent', () => {
  let component: GrandlivreComponent;
  let fixture: ComponentFixture<GrandlivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandlivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandlivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
