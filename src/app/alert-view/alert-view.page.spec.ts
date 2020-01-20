import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertViewPage } from './alert-view.page';

describe('AlertViewPage', () => {
  let component: AlertViewPage;
  let fixture: ComponentFixture<AlertViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
