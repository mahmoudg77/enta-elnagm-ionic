import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalentProfilePage } from './talent-profile.page';

describe('TalentProfilePage', () => {
  let component: TalentProfilePage;
  let fixture: ComponentFixture<TalentProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TalentProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
