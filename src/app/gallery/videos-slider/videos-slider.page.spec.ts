import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideosSliderPage } from './videos-slider.page';

describe('VideosSliderPage', () => {
  let component: VideosSliderPage;
  let fixture: ComponentFixture<VideosSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideosSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
