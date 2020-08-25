import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPendingComponent } from './register-pending.component';

describe('RegisterPendingComponent', () => {
  let component: RegisterPendingComponent;
  let fixture: ComponentFixture<RegisterPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
