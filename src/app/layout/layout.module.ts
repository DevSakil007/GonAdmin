import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutRoutingModule } from './layout-routing.module';

import { LayoutComponent } from './layout.component'; 
import { HeaderComponent } from '../layout/header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component'; 
import { FooterComponent } from '../layout/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutRoutingModule
    
  ],
  declarations: [LayoutComponent, HeaderComponent,
    LeftSidebarComponent,
    FooterComponent]
})
export class LayoutModule {
  
}
