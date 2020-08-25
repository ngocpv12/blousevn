import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCancelComponent } from './manage-cancel.component';

describe('ManageCancelComponent', () => {
  let component: ManageCancelComponent;
  let fixture: ComponentFixture<ManageCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
