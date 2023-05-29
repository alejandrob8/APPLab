import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';
import { TestsService } from 'src/app/core/services/tests/tests.service';
import { Test } from 'src/app/shared/models/test.model';

@Component({
  selector: 'app-new-update-test',
  templateUrl: './new-update-test.component.html',
  styleUrls: ['./new-update-test.component.css']
})
export class NewUpdateTestComponent {
  test: Test[] = [];
  
  form: FormGroup;
  actionTitle: string = "Nueva";
  idToUpdate: number;

  constructor(
    private _testsService: TestsService,
    private _elementIdSharingService: ElementIdSharingService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar 
    ){
      this.form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(40)]],
        description: ['', [Validators.required]]
      });
      this.idToUpdate = this._elementIdSharingService.getElementId();
  }

  ngOnInit(): void {
    this.newOrUpdate(this.idToUpdate);
  }

  newUpdateTest(){

    const test = {
      id: this.idToUpdate,
      name: this.form.value.name,
      description: this.form.value.description
    };

    if(this.idToUpdate == undefined){
      this._testsService.addTest(test).subscribe(() =>{
        this.operationMessage('Prueba creada');
        this.form.reset();
      });
    }else{
      this._testsService.updateTest(this.idToUpdate, test).subscribe(data => {
        this.operationMessage('Prueba ' +this.idToUpdate+' actualizada');
        this.router.navigate(['/dashboard/pruebas']);
      })
    }
  }

  newOrUpdate(idToUpdate: number){
    if(idToUpdate !== undefined){
      this.actionTitle = "Actualizar"
      this.getTestById(idToUpdate);
    }
  }

  getTestById(id: number){
    this._testsService.getTestById(id).subscribe(data => {
      
      this.form.setValue({
        name: data.name,
        description: data.description
      })
    })  
  }

  operationMessage(message: string) {
    this._snackBar.open(message, "cerrar", {duration: 4000, verticalPosition: 'bottom'});
  }
}
