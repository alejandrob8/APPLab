import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUpdateAffiliateComponent } from './new-update-affiliate.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('NewUpdateAffiliateComponent', () => {
  let component: NewUpdateAffiliateComponent;
  let fixture: ComponentFixture<NewUpdateAffiliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUpdateAffiliateComponent ],
      imports: [ 
        SharedModule, 
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUpdateAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
