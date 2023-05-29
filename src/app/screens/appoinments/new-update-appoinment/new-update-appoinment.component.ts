import { Component } from '@angular/core';
import { AffiliatesService } from 'src/app/core/services/affiliates/affiliates.service';
import { Affiliate } from 'src/app/shared/models/affiliate.model';
import { TestsService } from 'src/app/core/services/tests/tests.service';
import { Test } from 'src/app/shared/models/test.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppoinmentsService } from 'src/app/core/services/appoinments/appoinments.service';
import { convertHour12to24, convertHour24to12 } from 'src/app/core/services/utils/hourFormat';
import { dateFormat, dateToMonthDayYear } from 'src/app/core/services/utils/dateFormat';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';

@Component({
  selector: 'app-new-update-appoinment',
  templateUrl: './new-update-appoinment.component.html',
  styleUrls: ['./new-update-appoinment.component.css']
})
export class NewUpdateAppoinmentComponent {
  
  affiliates: Affiliate[] = [];
  tests: Test[] = [];

  form: FormGroup;

  actionTitle: string = "Nueva";
  idToUpdate: number;

  constructor(
    private _affiliatesService: AffiliatesService, 
    private _testsService: TestsService,
    private _appoinmentsService: AppoinmentsService, 
    private formBuilder: FormBuilder, 
    private _elementIdSharingService: ElementIdSharingService,
    private router: Router,
    private _snackBar: MatSnackBar
    ){

      this.form = this.formBuilder.group({
        date: [null, Validators.required],
        hour: ['', Validators.required],
        idAffiliate: this.formBuilder.group({
          id: [null, Validators.required]
        }),
        idTest: this.formBuilder.group({
          id: [null, Validators.required]
        })
      });
      this.idToUpdate = this._elementIdSharingService.getElementId();
  }

  ngOnInit(): void {
    this.newOrUpdate(this.idToUpdate);
    this.getListAffiliates();
    this.getListTests();
  }

  private getListAffiliates(){
    this._affiliatesService.getAffiliates().subscribe(data => {
      this.affiliates = data;
    });
  }

  private getListTests(){
    this._testsService.getTests().subscribe(data => {
      this.tests = data;
    });
  }

  newUpdateAppoinment(){
    
    const appoinment = {
      id: this.idToUpdate,
      date: dateFormat(this.form.value.date),
      hour: convertHour12to24(this.form.value.hour),
      idAffiliate: {
        id: this.form.value.idAffiliate.id
      },
      idTest: {
        id: this.form.value.idTest.id
      }
    };

    if(this.idToUpdate == undefined){
      this._appoinmentsService.addAppoinment(appoinment).subscribe(() =>{
        this.operationMessage('Cita creada');
        this.form.reset();
      });
    }else{
      this._appoinmentsService.updateAppoinment(this.idToUpdate, appoinment).subscribe(data => {
        this.operationMessage('Cita ' +this.idToUpdate+' actualizada');
        this.router.navigate(['/dashboard/citas']);
      })
    }
  }

  newOrUpdate(idToUpdate: number){
    if(idToUpdate !== undefined){
      this.actionTitle = "Actualizar"
      this.getAppoinmentById(idToUpdate);
    }
  }

  getAppoinmentById(id: number){
    this._appoinmentsService.getAppoinmentById(id).subscribe(data => {
      
      this.form.setValue({
        date: new Date(dateToMonthDayYear(data.date)), 
        hour: convertHour24to12(data.hour),
        idAffiliate: {id: data.idAffiliate.id},
        idTest: {id: data.idTest.id}
      })
    })  
  }

  operationMessage(message: string) {
    this._snackBar.open(message, "cerrar", {duration: 3500, verticalPosition: 'bottom'});
  }

}
