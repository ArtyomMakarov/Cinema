import { Component, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input("totalFilms")
  private totalFilms:number;

  @Input("filmsPerPage")
  private filmsPerPage:number;


  constructor() {
  }

  getPages():Array<number> {
    let pageNumbers:Array<number> = [];
    for (let i = 1; i <= Math.ceil(this.totalFilms / this.filmsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}
