import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedUpComponent } from './signed-up.component';

describe('SignedUpComponent', () => {
  let component: SignedUpComponent;
  let fixture: ComponentFixture<SignedUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
