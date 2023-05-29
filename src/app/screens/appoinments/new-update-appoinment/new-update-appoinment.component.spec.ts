import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateAppoinmentComponent } from './new-update-appoinment.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewUpdateAppoinmentComponent', () => {
  let component: NewUpdateAppoinmentComponent;
  let fixture: ComponentFixture<NewUpdateAppoinmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateAppoinmentComponent ],
      imports: [ 
        SharedModule, 
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUpdateAppoinmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
