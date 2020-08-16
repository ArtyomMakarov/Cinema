import { Component, OnInit } from '@angular/core';
import {ICinemaInfo} from "../ICinemaInfo";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  private film:Array<ICinemaInfo>=[];
  public today:number = Date.now();

  constructor(private http:HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let name:string='';
    this.route.paramMap.subscribe(paramMap => {
      name = paramMap.get('name');
    });
    this.http
      .get(`http://localhost:3000/films?name=${name}`)
      .subscribe((_film:Array<ICinemaInfo>) => {
        this.film = _film;
      });
  }

  get getFilm(): Array<ICinemaInfo> {
    return this.film;
  }

}
