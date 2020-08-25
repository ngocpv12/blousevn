import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }
  _url = environment.SERVER_URL + 'payment';

  getPayUrl = (rawData) => {
    let data = {
      orderInfo: "Thanh toán qua Momo",
      amount: rawData.paymentHistories[0].amount.toString(),
      orderId: rawData.paymentHistories[0].id.toString(),
      requestId: rawData.id.toString(),
      extraData: ''
    }

    return this.http.post<any>(this._url + '/send', data)
      .pipe(catchError(this.errorHandler));
  }

  confirmPayment = (data) => {
    return this.http.post<any>(this._url + '/notify', data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
