import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutemployeComponent } from './ajoutemploye.component';

describe('AjoutemployeComponent', () => {
  let component: AjoutemployeComponent;
  let fixture: ComponentFixture<AjoutemployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutemployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutemployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
