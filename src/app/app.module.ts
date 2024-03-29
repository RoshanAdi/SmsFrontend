import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {AuthInterceptor, authInterceptorProviders} from "./JwtTokenSetup/_helpers/auth.interceptor";
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [ AppComponent ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,NgChartsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },{ provide: NgChartsConfiguration, useValue: { generateColors: false }},],
  bootstrap: [AppComponent]
})
export class AppModule { }
