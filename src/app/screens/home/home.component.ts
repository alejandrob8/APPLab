import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppoinmentsService } from 'src/app/core/services/appoinments/appoinments.service';
import { dateFormat } from 'src/app/core/services/utils/dateFormat';
import { Appoinment } from 'src/app/shared/models/appoinment.model';
import { AppoinmentByDate } from 'src/app/shared/models/appointmentByDate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit{
  
  columnsToDisplay = ['idAffiliate','name', 'age', 'mail'];
  columnsToDisplaySecondTable = ['id','date', 'hour', 'name'];
  columnsToDisplayWithExpand = ['expand',...this.columnsToDisplay];
  expandedElement: Appoinment | null | undefined;
  
  dataSource: any [] = [];

  showTable: boolean = false;

  loading: boolean = false;

  idForm: FormGroup;

  dateForm: FormGroup;

  id!: number;
  date!: string;

  constructor(
    private _appoinmentsService: AppoinmentsService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
    ){
      this.idForm = this.formBuilder.group({
        idAfiliate: [null, [Validators.required, Validators.pattern('^[0-9]+$')]] 
      });

      this.dateForm = this.formBuilder.group({
        appointmentDate: [null, Validators.required] 
      });
  }

  ngOnInit(): void {
    
  }

  getAppoinmentByAffiliateId(id: number){
    this._appoinmentsService.getAppoinmentByAffiliateId(id).subscribe({
      next: (response: HttpResponse<any>) => {

        if(response.status === 200){
          this.objectMap(response.body);
          this.showTable = true;
        }
      },
      error: (error: any) => {
        
        if(error.status === 404){
          this.showTable = false;
          this.operationMessage('No se encontraron citas asignadas al afiliado '+ id, 4000);
        }else{
          this.showTable = false;
          this.operationMessage('Ocurrió en error en la consulta', 4000);
        }
      }
    });  
  }

  getAppoinmentByDate(date: string){
    this._appoinmentsService.getAppoinmentByDate(date).subscribe({
      next: (response: HttpResponse<any>) => {
        
        if(response.status === 200){
          this.objectMap(response.body);
          this.showTable = true;
        }
      },
      error: (error: any) => {
        
        if(error.status === 404){
          this.showTable = false;
          this.operationMessage('No se encontraron citas asignadas para la fecha '+ date, 5000);
        }else{
          this.showTable = false;
          this.operationMessage('Ocurrió en error en la consulta', 4000);
        }
      }
    });  
  }

  byAffiliateId(){
    if(this.dateForm.valid){
      this.dateForm.reset();
    }
    this.id = this.idForm.value.idAfiliate;
    this.loading = true;
    this.getAppoinmentByAffiliateId(this.id);
    this.loading = false;
  }

  byDate(){
    if(this.idForm.valid){
      this.idForm.reset();
    }
    this.date = dateFormat(this.dateForm.value.appointmentDate);
    this.loading = true;
    this.getAppoinmentByDate(this.date);
    this.loading = false;
  }

  operationMessage(message: string, duration?: number) {
    this._snackBar.open(message, "cerrar", {duration: duration, verticalPosition: 'bottom'});
  }

  objectMap(data: any){
     
    const mappedObj = data.reduce((result: Record<number, any>, obj: AppoinmentByDate) => { 
      
      const affiliateId = obj.idAffiliate.id;
      
      const newAppointment = {
        id: obj.id,
        date: obj.date,
        hour: obj.hour,
        idTest: obj.idTest 
      };
    
      if (!result[affiliateId]) { 
        result[affiliateId] = {
          idAffiliate: affiliateId,
          name: obj.idAffiliate.name, 
          age: obj.idAffiliate.age, 
          mail: obj.idAffiliate.mail,
          appTest: [newAppointment]
        }; 
      }else{
        result[affiliateId].appTest.push(newAppointment);
      }
    
      return result; 
    
    }, {}); 

    const mappedArray = Object.values(mappedObj);
    this.dataSource = mappedArray;
  }

}

const dataMock: any[] = [
  {idAffiliate: 1, name: "juan", age: 23, mail: "juan@mail.com",
  appTest: [{id: 1, date: "02/08/2023", hour: "08:23", name: "Prueba test 1"},
  {id: 2, date: "02/08/2023", hour: "12:40", name: "Prueba test 2"},
  {id: 3, date: "02/08/2023", hour: "15:30", name: "Prueba test 3"}]},
  {idAffiliate: 2, name: "pedro", age: 23, mail: "pedro@mail.com",
  appTest: [{id: 1, date: "02/08/2023", hour: "09:45", name: "Prueba test 4"},
  {id: 2, date: "02/08/2023", hour: "14:20", name: "Prueba test 5"},
  {id: 3, date: "02/08/2023", hour: "10:33", name: "Prueba test 6"}]}
];

const dataList: any [] = [

  {

    "id": 1,
    "date": "02/08/2023",
    "hour": "02:35",
    "idTest": {
      "id": 5,
      "name": "Test 5",
      "description": "Prueba test 5"
    },

    "idAffiliate": {
      "id": 1,
      "name": "carlos",
      "age": 28,
      "mail": "carlos@yopmail.com"
    }
  },

  {

    "id": 3,
    "date": "02/08/2023",
    "hour": "08:00",
    "idTest": {
      "id": 1,
      "name": "Test 1",
      "description": "Prueba test 1"

    },

    "idAffiliate": {
      "id": 1,
      "name": "carlos",
      "age": 28,
      "mail": "carlos@yopmail.com"
    }
  },
  {
    "id": 4,
    "date": "02/08/2023",
    "hour": "08:00",
    "idTest": {
      "id": 2,
      "name": "Test 1",
      "description": "Prueba test 1"
    },

    "idAffiliate": {
      "id": 2,
      "name": "juan",
      "age": 32,
      "mail": "juan@yopmail.com"
    }
  } 

];