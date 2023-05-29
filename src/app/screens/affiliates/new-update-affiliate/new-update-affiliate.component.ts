import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AffiliatesService } from 'src/app/core/services/affiliates/affiliates.service';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';
import { Affiliate } from 'src/app/shared/models/affiliate.model';

@Component({
  selector: 'app-new-update-affiliate',
  templateUrl: './new-update-affiliate.component.html',
  styleUrls: ['./new-update-affiliate.component.css']
})
export class NewUpdateAffiliateComponent implements OnInit{

  affiliates: Affiliate[] = [];
  
  form: FormGroup;
  actionTitle: string = "Nuevo";
  idToUpdate: number;

  constructor(
    private _affiliatesService: AffiliatesService,
    private _elementIdSharingService: ElementIdSharingService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar 
    ){
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-ZáéíóúüÁÉÍÓÚñÑüÜ ]+$')]],
        age: [null, [Validators.required]],
        mail: ['', [Validators.required, Validators.email]]
      });
      this.idToUpdate = this._elementIdSharingService.getElementId();
  }

  ngOnInit(): void {
    this.newOrUpdate(this.idToUpdate);
  }

  newUpdateAffiliate(){

    const affiliate = {
      id: this.idToUpdate,
      name: this.form.value.name,
      age: this.form.value.age,
      mail: this.form.value.mail
    };

    if(this.idToUpdate == undefined){
      this._affiliatesService.addAffiliate(affiliate).subscribe(() =>{
        this.operationMessage('Afiliado creado');
        this.form.reset();
      });
    }else{
      this._affiliatesService.updateAffiliate(this.idToUpdate, affiliate).subscribe(data => {
        this.operationMessage('Afiliado ' +this.idToUpdate+' actualizado');
        this.router.navigate(['/dashboard/afiliados']);
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
    this._affiliatesService.getAffiliateById(id).subscribe(data => {
      console.log(data);
      
      this.form.setValue({
        name: data.name,
        age: data.age,
        mail: data.mail
      })
    })  
  }

  operationMessage(message: string) {
    this._snackBar.open(message, "cerrar", {duration: 4000, verticalPosition: 'bottom'});
  }

}
