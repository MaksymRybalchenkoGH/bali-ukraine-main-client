import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteeListPageComponent } from './invitee-list-page.component';

describe('HomePageComponent', () => {
  let component: InviteeListPageComponent;
  let fixture: ComponentFixture<InviteeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteeListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
