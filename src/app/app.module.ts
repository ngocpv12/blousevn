import { AppRoutingModule, routingComponents } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/general-components/header/header.component';
import { FooterComponent } from './components/general-components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { MedicalRecordComponent } from './components/medical-record/medical-record.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DoctorService } from './Services/doctor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './Services/token-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { RatingModule } from 'ng-starrating';
import { PaymentNotifyComponent } from './components/payment-notify/payment-notify.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';



const google_oauth_client_id = "591562531176-u1out3el8d87a4tt13ft26tnob9mfrgm.apps.googleusercontent.com";

const fbLoginOptions = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    MedicalRecordComponent,
    ScheduleComponent,
    PaymentNotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RatingModule,
    SocialLoginModule
  ],
  providers: [
    DoctorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              google_oauth_client_id,
              googleLoginOptions
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          }
        ],
      } as SocialAuthServiceConfig,
      
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
