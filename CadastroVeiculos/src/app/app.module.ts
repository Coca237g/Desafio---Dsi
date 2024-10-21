import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { OrdensModule } from './ordens/ordens.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, OrdensModule, AppRoutingModule],
  providers: [],
})
export class AppModule {}
