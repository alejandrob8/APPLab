import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementIdSharingService {

  private elementId: any;

  constructor() { }

  setElementId(id: any):void{
    this.elementId = id;
  }

  getElementId(): number{
    return this.elementId;
  }
}
