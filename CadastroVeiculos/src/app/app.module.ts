import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { VeiculosModule } from './veiculos/veiculos.module';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    VeiculosModule,
  ],
  providers: [],
})
export class AppModule { }

bootstrapApplication(AppComponent).catch(err => console.error(err));
