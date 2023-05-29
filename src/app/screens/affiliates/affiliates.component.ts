import { Component, OnInit } from '@angular/core';
import { Affiliate } from 'src/app/shared/models/affiliate.model';
import { AffiliatesService } from 'src/app/core/services/affiliates/affiliates.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ElementIdSharingService } from 'src/app/core/services/elementId/element-id-sharing.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.css']
})
export class AffiliatesComponent  implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'age', 'mail', 'opciones'];
  dataSource: Affiliate[] = [];

  constructor(
    private _affiliatesService: AffiliatesService,
    private _elementIdSharingService: ElementIdSharingService,
    private _snackBar: MatSnackBar
    ){

  }
  ngOnInit(): void {
    this.getAffiliates();
  }

  getAffiliates(){
    this._affiliatesService.getAffiliates().subscribe(data => {
      this.dataSource = data;
    });
  }

  affiliateToUpdate(id: number){
    this._elementIdSharingService.setElementId(id);
  }

  eventButtonClicked():void{
    this._elementIdSharingService.setElementId(undefined);
  }

  affiliateToDelete(id: number){
    this._affiliatesService.deleteAffiliateById(id).subscribe(
      (response: HttpResponse<any>) =>{
      const statusCode = response.status;
      switch (statusCode){
        case 200:
          this.getAffiliates();
          this.operationMessage('Afiliado '+id+ ' eliminado', 4000);
        break;
        case 204:
          this.operationMessage('No se pudo eliminar afiliado '+id + '. Verifique que el afiliado no esté asignado a una cita.');
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


