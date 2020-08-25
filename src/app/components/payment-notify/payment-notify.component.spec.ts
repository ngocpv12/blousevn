import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentNotifyComponent } from './payment-notify.component';

describe('PaymentNotifyComponent', () => {
  let component: PaymentNotifyComponent;
  let fixture: ComponentFixture<PaymentNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
