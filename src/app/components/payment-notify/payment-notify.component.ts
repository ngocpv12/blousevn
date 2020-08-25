import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-payment-notify',
  templateUrl: './payment-notify.component.html',
  styleUrls: ['./payment-notify.component.css']
})
export class PaymentNotifyComponent implements OnInit {

  data;
  partnerCode;
  accessKey;
  requestId;
  amount;
  orderId;
  orderInfo;
  orderType;
  transId;
  errorCode;
  message;
  localMessage;
  responseTime;
  signature;
  extraData;
  payType;

  constructor(
    private _paymentService: PaymentService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params: ParamMap) => {
      let a = params['partnerCode'];
      let partnerCode = params['partnerCode'];
      this.partnerCode = partnerCode;
      let accessKey = params['accessKey'];
      this.accessKey = accessKey;
      let requestId = params['requestId'];
      this.requestId = requestId;
      let amount = params['amount'];
      this.amount = amount;
      let orderId = params['orderId'];
      this.orderId = orderId;
      let orderInfo = params['orderInfo'];
      this.orderInfo = orderInfo;
      let orderType = params['orderType'];
      this.orderType = orderType;
      let transId = params['transId'];
      this.transId = transId;
      let errorCode = params['errorCode'];
      this.errorCode = errorCode;
      let message = params['message'];
      this.message = message;
      let localMessage = params['localMessage'];
      this.localMessage = localMessage;
      let responseTime = params['responseTime'];
      this.responseTime = responseTime;
      let signature = params['signature'];
      this.signature = signature;
      let extraData = params['extraData'];
      this.extraData = extraData;
      let payType = params['payType'];
      this.payType = payType;
    });

    this.data = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId: this.requestId,
      amount: this.amount,
      orderId: this.orderId,
      orderInfo: this.orderInfo,
      orderType: this.orderType,
      transId: this.transId,
      errorCode: this.errorCode,
      message: this.message,
      localMessage: this.localMessage,
      responseTime: this.responseTime,
      signature: this.signature,
      extraData: this.extraData,
      payType: this.payType
    }

    this.sendNotification(this.data);
  }

  sendNotification = (data) => {
    debugger
    console.log("I'm sending data to server.");
    
    this._paymentService.confirmPayment(data)
    .subscribe(
      response => console.log('Success!', response),
      error => console.error('Error!', error)
    );
  }
}
