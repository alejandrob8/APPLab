import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { TestsComponent } from '../tests/tests.component';
import { AffiliatesComponent } from '../affiliates/affiliates.component';
import { AppoinmentsComponent } from '../appoinments/appoinments.component';
import { NewUpdateAppoinmentComponent } from '../appoinments/new-update-appoinment/new-update-appoinment.component';
import { NewUpdateAffiliateComponent } from '../affiliates/new-update-affiliate/new-update-affiliate.component';
import { NewUpdateTestComponent } from '../tests/new-update-test/new-update-test.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, 
  children: [
    { path: '', component: HomeComponent},
    { path: 'citas', component: AppoinmentsComponent},
    { path: 'pruebas', component: TestsComponent},
    { path: 'afiliados', component: AffiliatesComponent},
    
    //Routes screens new and update
    { path: 'citas/nueva', component: NewUpdateAppoinmentComponent},
    { path: 'citas/actualizar', component: NewUpdateAppoinmentComponent},
    { path: 'pruebas/nueva', component: NewUpdateTestComponent},
    { path: 'pruebas/actualizar', component: NewUpdateTestComponent},
    { path: 'afiliados/nuevo', component: NewUpdateAffiliateComponent},
    { path: 'afiliados/actualizar', component: NewUpdateAffiliateComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
