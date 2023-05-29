import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent {
  
  @Input() 
  buttonLabel: string = "New Button";

  @Input()
  pathLink: string = "NewPath";

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

  eventButtonClick():void{
    this.buttonClicked.emit();
  }

}
