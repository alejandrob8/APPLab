import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppoinmentsService } from 'src/app/core/services/appoinments/appoinments.service';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';
import { Appoinment } from 'src/app/shared/models/appoinment.model';

@Component({
  selector: 'app-appoinments',
  templateUrl: './appoinments.component.html',
  styleUrls: ['./appoinments.component.css']
})
export class AppoinmentsComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'date', 'hour', 'idTest', 'idAffiliate', 'opciones'];
  appoinments: Appoinment[] = [];

  constructor(
    private _appoinmentsService: AppoinmentsService, 
    private _elementIdSharingService: ElementIdSharingService, 
    private _snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.getListAppoinments();
  }

  private getListAppoinments(){
    this._appoinmentsService.getAppoinments().subscribe(data => {
      this.appoinments = data;
    });
  }

  appoinmentToUpdate(id: number){
    this._elementIdSharingService.setElementId(id);
  }

  eventButtonClicked():void{
    this._elementIdSharingService.setElementId(undefined);
  }

  appoinmentToDelete(id: number){
    this._appoinmentsService.deleteAppoinmentById(id).subscribe(response =>{
      this.getListAppoinments();
      this.operationMessage('Cita '+id+ ' eliminada');
    })
  }

  operationMessage(message: string) {
    this._snackBar.open(message, "cerrar", {duration: 3500, verticalPosition: 'top'});
  }

}
