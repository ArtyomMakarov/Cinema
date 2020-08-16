type StatusType = {
  status: string
}
export interface ICinemaInfo {
  id: number,
  name:string,
  img: string,
  info: string,
  places: Array<Array<StatusType>>
}
