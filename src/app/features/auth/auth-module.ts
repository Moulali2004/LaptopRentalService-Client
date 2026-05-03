import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing-module';

import { InputTextModule }    from 'primeng/inputtext';
import { ButtonModule }       from 'primeng/button';
import { ToastModule }        from 'primeng/toast';
import { MessageService }     from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ],
  providers: [ MessageService]
})
export class AuthModule {}
