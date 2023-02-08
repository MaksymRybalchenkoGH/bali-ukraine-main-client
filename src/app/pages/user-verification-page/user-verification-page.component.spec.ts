import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerificationPageComponent } from './user-verification-page.component';

describe('DemoTestComponent', () => {
  let component: UserVerificationPageComponent;
  let fixture: ComponentFixture<UserVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerificationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
