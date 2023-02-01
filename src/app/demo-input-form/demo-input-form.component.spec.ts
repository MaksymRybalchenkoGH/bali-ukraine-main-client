import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInputFormComponent } from './demo-input-form.component';

describe('DemoInputFormComponent', () => {
  let component: DemoInputFormComponent;
  let fixture: ComponentFixture<DemoInputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoInputFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoInputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
