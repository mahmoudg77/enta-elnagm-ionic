// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HeaderButtonsComponent } from './header-buttons/header-buttons.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

 
 import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule
    ],
  declarations: [HeaderComponent,HeaderButtonsComponent ],
  exports:[HeaderComponent,HeaderButtonsComponent ],
  providers:[
    // InAppBrowser
  ]

})
export class ComponentsModule {}
