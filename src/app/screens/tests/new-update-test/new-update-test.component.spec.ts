import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateTestComponent } from './new-update-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('NewUpdateTestComponent', () => {
  let component: NewUpdateTestComponent;
  let fixture: ComponentFixture<NewUpdateTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateTestComponent ],
      imports: [  
        SharedModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUpdateTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
