import {Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef} from '@angular/core';
import {ICinemaInfo} from "../ICinemaInfo";
import {IPlace} from "../IPlace";

@Component({
  selector: 'map-places',
  templateUrl: './map-places.component.html',
  styleUrls: ['./map-places.component.scss']
})
export class MapPlacesComponent implements OnInit {

  @Input("film")
  private film: Array<ICinemaInfo>;

  @Input("bookPlaces")
  private bookPlaces:Array<IPlace>;

  @Output("bookPlaces")
  private bookPlaceOutputEE:EventEmitter<Array<IPlace>> = new EventEmitter<Array<IPlace>>();

  @ViewChild("mapPlaces")
  mapPlacesElemRef: ElementRef;

  @Output("clickPlace")
  private clickPlaceEE:EventEmitter<IPlace>= new EventEmitter<IPlace>();

  private maxBookPlace: number = 4;

  ngOnInit(): void {
  }

  getFilm(): Array<ICinemaInfo> {
    return this.film;
  }

  hoverPlace(ev: Event, hover: boolean, b: number): void {
    let placeNumber = b + 1;
      if (hover) {
        (<HTMLDivElement>ev.target).className = "row__place_hover";
        (<HTMLDivElement>ev.target).textContent = `${placeNumber}`;
      } else {
        (<HTMLDivElement>ev.target).className = "row__place";
        (<HTMLDivElement>ev.target).textContent = '';
      }
  }

  onMouseWheel(ev) {
    let elem =  this.mapPlacesElemRef.nativeElement,
        size = {w: elem.offsetWidth, h: elem.offsetHeight},
        pos = {x: 0, y: 0},
        zoom_target = {x: 0, y: 0},
        zoom_point = {x: 0, y: 0},
        scale = 1,
        factor = 0.4,
        max_scale = 4,
        offsetTop = elem.offsetTop,
        offsetLeft = elem.offsetLeft;

    zoom_point.x = ev.pageX - offsetTop.left;
    zoom_point.y = ev.pageY - offsetLeft.top;
    // console.log(target,size, offsetTop, offsetLeft);

    ev.preventDefault();
    let delta = ev.wheelDelta;
    if (delta === undefined) {
      //we are on firefox
      delta = ev.originalEvent.detail;
    }
    delta = Math.max(-1, Math.min(1, delta)); // cap the delta to [-1,1] for cross browser consistency

    // determine the point on where the slide is zoomed in
    zoom_target.x = (zoom_point.x - pos.x) / scale;
    zoom_target.y = (zoom_point.y - pos.y) / scale;

    // apply zoom
    scale += delta * factor * scale;
    scale = Math.max(1, Math.min(max_scale, scale));

    // calculate x and y based on zoom
    pos.x = -zoom_target.x * scale + zoom_point.x;
    pos.y = -zoom_target.y * scale + zoom_point.y;


    // Make sure the slide stays in its container area when zooming out
    if (pos.x > 0)
      pos.x = 0;
    if (pos.x + size.w * scale < size.w)
      pos.x = -size.w * (scale - 1);
    if (pos.y > 0)
      pos.y = 0;
    if (pos.y + size.h * scale < size.h)
      pos.y = -size.h * (scale - 1);

    this.mapPlacesElemRef.nativeElement.style.transform = 'translate(' + (pos.x) + 'px,' + (pos.y) + 'px)';
    this.mapPlacesElemRef.nativeElement.style.transform = 'scale(' + scale + ',' + scale + ')';
  }

  bookPlace(placeStatus:{status: string}, _row: number, _col: number, ev:Event):void {
    let currentPlace = this.film[0].places[_row][_col];
    let _place:IPlace = {id: `${_row+1} ряд\\${_col+1} место`,
                         row: _row,
                         col: _col,
                         status: currentPlace.status};

    if(this.bookPlaces.length > this.maxBookPlace-1 && _place.status=="free") {
      alert('Вы можете выбрать максимум 4 места!');
      return;
    }

    switch (_place.status) {

      case "blocked":
        (<HTMLDivElement>ev.target).className = "info__place_unavailable";
        break;

      case "in process":
        currentPlace.status = "free";
        let arr = this.bookPlaces.filter(place=> place.id!==_place.id);
        this.bookPlaces = arr;
        break;

      default:
        let newStatus = currentPlace.status = "in process";
        let place = {..._place, status: newStatus};
        this.bookPlaces.push(place);
    }
    this.bookPlaceOutputEE.emit(this.bookPlaces);
    console.log(this.bookPlaces);
  }

}
