import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenHeaderComponent } from './screen-header.component';
import { SharedModule } from '../../shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ScreenHeaderComponent', () => {
  let component: ScreenHeaderComponent;
  let fixture: ComponentFixture<ScreenHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenHeaderComponent ],
      imports: [ 
        SharedModule, 
        AppRoutingModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
