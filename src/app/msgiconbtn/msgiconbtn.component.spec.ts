import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgiconbtnComponent } from './msgiconbtn.component';

describe('MsgiconbtnComponent', () => {
  let component: MsgiconbtnComponent;
  let fixture: ComponentFixture<MsgiconbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgiconbtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgiconbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
