import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-screen-header',
  templateUrl: './screen-header.component.html',
  styleUrls: ['./screen-header.component.css']
})
export class ScreenHeaderComponent {
  
  @Input() 
  title: string = "New Title";
}
