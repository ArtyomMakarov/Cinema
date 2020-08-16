import { Component, Input, OnChanges} from '@angular/core';
import {ICinemaInfo} from "../ICinemaInfo";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements  OnChanges{
  @Input("films")
  private films: Array<ICinemaInfo>;

  constructor(private http1:HttpClient, private http2:HttpClient, private route: ActivatedRoute) {
  }

  ngOnChanges():void{
    let page:number = 0;
    this.route.paramMap.subscribe(paramMap => {
      page = +paramMap.get('page');
      this.loadData(page);
    });
  }

  loadData(page:number):void {
    if(page>0) {
      this.http1
        .get(`http://localhost:3000/films?_page=${page}`)
        .subscribe((films)=> {
          this.films = <Array<ICinemaInfo>>films;
        });
    } else{
      this.http1
        .get('http://localhost:3000/films?_page=1')
        .subscribe((films)=> {
          this.films = <Array<ICinemaInfo>>films;
        });
    }
  }

  getFilms():Array<ICinemaInfo> {
    return this.films;
  }
}



