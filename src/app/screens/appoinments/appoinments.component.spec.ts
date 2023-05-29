import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentsComponent } from './appoinments.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AppoinmentsComponent', () => {
  let component: AppoinmentsComponent;
  let fixture: ComponentFixture<AppoinmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentsComponent ],
      imports: [ 
        SharedModule, 
        AppRoutingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
