import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTierComponent } from './detail-tier.component';

describe('DetailTierComponent', () => {
  let component: DetailTierComponent;
  let fixture: ComponentFixture<DetailTierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
