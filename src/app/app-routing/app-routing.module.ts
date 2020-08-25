import { ManageConfirmedComponent } from './../components/manage-confirmed/manage-confirmed.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { PageNotFoundComponent } from '../components/general-components/page-not-found/page-not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ServicePageComponent } from '../components/service-page/service-page.component';
import { DoctorPageComponent } from '../components/doctor-page/doctor-page.component';
import { RegisterComponent } from '../components/register/register.component';
import { DoctorDetailComponent } from '../components/doctor-detail/doctor-detail.component';
import { MedicalRecordComponent } from '../components/medical-record/medical-record.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { AuthGuard } from '../helpers/auth.guard';
import { ProfileSettingComponent } from '../components/profile-setting/profile-setting.component';
import { ProfileInformationComponent } from '../components/profile-information/profile-information.component';
import { AccountInfoComponent } from '../components/account-info/account-info.component';
import { ManageRequestComponent } from '../components/manage-request/manage-request.component';
import { ManageIndexComponent } from '../components/manage-index/manage-index.component';
import { ManageHistoryComponent } from '../components/manage-history/manage-history.component';
import { ManageScheduleComponent } from '../components/manage-schedule/manage-schedule.component';
import { ManageAllScheduleComponent } from '../components/manage-all-schedule/manage-all-schedule.component';
import { ManageCancelComponent } from '../components/manage-cancel/manage-cancel.component';
import { RegisterPendingComponent } from '../components/register-pending/register-pending.component';
import { PaymentNotifyComponent } from './../components/payment-notify/payment-notify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'service',
    component: ServicePageComponent
  },
  {
    path: 'doctor',
    component: DoctorPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register-pending',
    component: RegisterPendingComponent
  },
  {
    path: 'medical-record',
    component: MedicalRecordComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileSettingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile-info',
        component: ProfileInformationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'account-info',
        component: AccountInfoComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'doctor/:id',
    component: DoctorDetailComponent
  },
  {
    path: 'register-pending', 
    component: RegisterPendingComponent
  },
  {
    path: 'manage-index', 
    component: ManageIndexComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'manage-all',
        component: ManageAllScheduleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-request',
        component: ManageRequestComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-confirmed',
        component: ManageConfirmedComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-schedule',
        component: ManageScheduleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-history',
        component: ManageHistoryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'manage-cancel',
        component: ManageCancelComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'payment-notify',
    component: PaymentNotifyComponent,
    canActivate: [AuthGuard]
  },
  { 
    path:'**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomePageComponent,
  LoginComponent,
  ContactComponent,
  ServicePageComponent,
  DoctorPageComponent,
  DoctorDetailComponent,
  RegisterComponent,
  ScheduleComponent,
  MedicalRecordComponent,
  PageNotFoundComponent,
  ProfileSettingComponent,
  PageNotFoundComponent,
  ProfileInformationComponent,
  AccountInfoComponent,
  ManageRequestComponent,
  ManageIndexComponent,
  ManageScheduleComponent,
  ManageHistoryComponent,
  ManageAllScheduleComponent,
  ManageCancelComponent,
  ManageConfirmedComponent,
  RegisterPendingComponent
];
