import { Component, OnInit } from '@angular/core';
import {ICinemaInfo} from '../ICinemaInfo';
import {IPlace} from '../IPlace';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MyModalComponent } from '../my-modal/my-modal.component';
import '../../assets/smtp/smtp'; // file path may change →
declare let Email: any;
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-choose-places',
  templateUrl: './choose-places.component.html',
  styleUrls: ['./choose-places.component.scss']
})
export class ChoosePlacesComponent implements OnInit {

  private film: Array<ICinemaInfo> = [];
  private _bookPlaces: Array<IPlace> = [];
  private name: string;
  private eMail:string;
  public today: number = Date.now();

  constructor(private http1: HttpClient, private http2: HttpClient,
              private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    let name: string = '';
    this.route.paramMap.subscribe(paramMap => {
      name = paramMap.get('name');
    });
    this.http1
      .get(`http://localhost:3000/films?name=${name}`)
      .subscribe((_film: Array<ICinemaInfo>) => {
        this.film = _film;
      });
  }

  getFilm(): Array<ICinemaInfo> {
    return this.film;
  }

  bookedPlaces(bookPlaces: Array<IPlace>) {
    console.log(this._bookPlaces);
    this._bookPlaces = bookPlaces;
  }

  get bookPlaces(): Array<IPlace> {
    return this._bookPlaces;
  }

  cancelBook(_place: IPlace):void{
    this.film[0].places[_place.row][_place.col].status = "free";
    let arr1 = this._bookPlaces.filter(place => place.id !== _place.id);
    this._bookPlaces = arr1;
  }

  payTicket():void {
    for(let i = 0; i <= this._bookPlaces.length - 1; i++) {
      let row = this._bookPlaces[i].row;
      let col = this._bookPlaces[i].col;
      this.film[0].places[row][col].status = 'blocked';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '250px',
      data: {name: this.name, eMail: this.eMail}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.eMail = result.email;
      this.name = result.name;
      console.log(this.eMail, this.name);
      if (this.eMail && this.name) {
        this.sendTicket();
      }
    });
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  sendTicket(): void {
    let ticketsStr = '';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

    for (let i = 0; i <= this._bookPlaces.length - 1; i++) {
      ticketsStr += `<li>${this._bookPlaces[i].id}</li>`;
    }

    for (let i = 0; i <= this._bookPlaces.length - 1; i++) {
      let row = this._bookPlaces[i].row;
      let col = this._bookPlaces[i].col;
      this.film[0].places[row][col].status = 'blocked';
    }

    let filmJSON = JSON.stringify(this.film[0]);

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'makar6031994@gmail.com',
      Password : '6B8339900FDD3F4FB07313DAD63EECDFF53C',
      To : this.eMail,
      From : 'makar6031994@gmail.com',
      Subject : 'Cinema ticket',
      Body : `<h1>Здравствуйте, ${this.name}.</h1> <ul>Ваши билеты: ${ticketsStr}</ul>`
    });

    alert('Ваши билеты успешно забронированы и отправлены Вам на почту :)');

     this.http2
       .put(`http://localhost:3000/films/${this.film[0].id}`, filmJSON, httpOptions)
       .pipe(
         catchError(this.handleError)
       )
       .subscribe();
  }

}
