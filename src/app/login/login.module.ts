import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule {}
