import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageConfirmedComponent } from './manage-confirmed.component';

describe('ManageConfirmedComponent', () => {
  let component: ManageConfirmedComponent;
  let fixture: ComponentFixture<ManageConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
