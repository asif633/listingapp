import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterNavbarComponent } from './outer-navbar.component';

describe('OuterNavbarComponent', () => {
  let component: OuterNavbarComponent;
  let fixture: ComponentFixture<OuterNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
