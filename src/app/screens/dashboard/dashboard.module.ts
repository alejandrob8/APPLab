import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { AffiliatesComponent } from '../affiliates/affiliates.component';
import { AppoinmentsComponent } from '../appoinments/appoinments.component';
import { TestsComponent } from '../tests/tests.component';
import { NewUpdateAppoinmentComponent } from '../appoinments/new-update-appoinment/new-update-appoinment.component';
import { NewUpdateAffiliateComponent } from '../affiliates/new-update-affiliate/new-update-affiliate.component';
import { NewUpdateTestComponent } from '../tests/new-update-test/new-update-test.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    AffiliatesComponent,
    AppoinmentsComponent,
    TestsComponent,
    NewUpdateTestComponent,
    NewUpdateAffiliateComponent,
    NewUpdateAppoinmentComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
