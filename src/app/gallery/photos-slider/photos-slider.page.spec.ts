import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotosSliderPage } from './photos-slider.page';

describe('PhotosSliderPage', () => {
  let component: PhotosSliderPage;
  let fixture: ComponentFixture<PhotosSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotosSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
