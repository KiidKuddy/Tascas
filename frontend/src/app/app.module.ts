import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTascaComponent } from './edit-tasca/edit-tasca.component';
import { HomeComponent } from './home/home.component';
import { TascaService } from './_services/tasca.service';
import { TascaDetailsComponent } from './tasca-details/tasca-details.component';
import { SafePipe } from './_pipes/safe.pipe';

@NgModule({
   declarations: [
      AppComponent,
      EditTascaComponent,
      HomeComponent,
      TascaDetailsComponent,
      SafePipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      TascaService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
