import { Component } from '@angular/core';
import {ICinemaInfo} from "../ICinemaInfo";
import {CinemaDatasource} from "../Cinema.datasource";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent  {

  private films:Array<ICinemaInfo>;
  public filmsPerPage:number=10;
  public totalFilms:number;

  constructor(private datasource: CinemaDatasource) {
    datasource.getObservable().subscribe(_films => {
      this.films = _films;
      this.totalFilms = _films.length;
    })
  }

  getFilms():Array<ICinemaInfo> {
    return this.films;
  }
}
