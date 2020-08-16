import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import {ICinemaInfo} from "./ICinemaInfo";

@Injectable()
export class CinemaDatasource {

  constructor(private http:HttpClient) {
  }

  getObservable():Observable<Array<ICinemaInfo>> {
    return <Observable<Array<ICinemaInfo>>>this.http
      .get('http://localhost:3000/films');
  }

}
