// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// localisation
import { LOCALE_ID } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeRu, 'ru');
// angular-material
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// components
import { CinemaComponent } from './Cinema/Cinema.component';
import {CinemaDatasource} from './Cinema.datasource';
import { FilmsComponent } from './films/films.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ContentComponent } from './content/content.component';
import { FilmComponent } from './film/film.component';
import { ChoosePlacesComponent } from './choose-places/choose-places.component';
import { MapPlacesComponent } from './map-places/map-places.component';
import { MyModalComponent } from './my-modal/my-modal.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  declarations: [
    CinemaComponent,
    FilmsComponent,
    PaginationComponent,
    ContentComponent,
    FilmComponent,
    ChoosePlacesComponent,
    MapPlacesComponent,
    MyModalComponent
  ],
  providers: [CinemaDatasource,
    { provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [CinemaComponent]
})
export class AppModule { }
