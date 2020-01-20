import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoadingViewPage } from './loading-view.page';

describe('LoadingViewPage', () => {
  let component: LoadingViewPage;
  let fixture: ComponentFixture<LoadingViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
