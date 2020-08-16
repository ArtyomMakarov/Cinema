import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from "./content/content.component";
import {FilmComponent} from "./film/film.component";
import {ChoosePlacesComponent} from "./choose-places/choose-places.component";


const routes: Routes = [
  { path: 'films/:page', component: ContentComponent},
  {path:'film/:name', component: FilmComponent},
  {path:'choose_places/:name', component: ChoosePlacesComponent},
  { path: '**', redirectTo: 'films/1' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
