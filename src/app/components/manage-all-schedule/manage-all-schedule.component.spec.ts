import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAllScheduleComponent } from './manage-all-schedule.component';

describe('ManageAllScheduleComponent', () => {
  let component: ManageAllScheduleComponent;
  let fixture: ComponentFixture<ManageAllScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAllScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAllScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
