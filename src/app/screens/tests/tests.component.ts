import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';
import { TestsService } from 'src/app/core/services/tests/tests.service';
import { Test } from 'src/app/shared/models/test.model';



@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'name','description','opciones'];
  dataSource: Test[] = [];

  constructor(
    private _testsService: TestsService,
    private _elementIdSharingService: ElementIdSharingService, 
    private _snackBar: MatSnackBar
    ){

  }
  ngOnInit(): void {
    this.getTests();
  }

  private getTests(){
    this._testsService.getTests().subscribe(data => {
      this.dataSource = data;
    });
  }

  testToUpdate(id: number){
    this._elementIdSharingService.setElementId(id);
  }

  eventButtonClicked():void{
    this._elementIdSharingService.setElementId(undefined);
  }

  testToDelete(id: number){
    this._testsService.deleteTestById(id).subscribe(
      (response: HttpResponse<any>) =>{
        const statusCode = response.status;
        switch (statusCode){
          case 200:
            this.getTests();
            this.operationMessage('Prueba '+id+ ' eliminada', 4000);
          break;
          case 204:
            this.operationMessage('No se pudo eliminar prueba '+id + '. Verifique que la prueba no esté asignada a una cita.');
          break;
          default:
            this.operationMessage('Ocurrió un error al eliminar', 4000);
          break;
        }
      });
  }

  operationMessage(message: string, duration?: number) {
    this._snackBar.open(message, "cerrar", {duration: duration, verticalPosition: 'bottom'});
  }
}
