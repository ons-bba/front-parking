import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../shared/interfaces/parking.interface';

@Injectable({
  providedIn: 'root'
})
export class searchParkingService {

  private apiUrl = 'http://localhost:3000/api/parking'

  constructor(private http:HttpClient) { };

  getNearbyParkings(lat:number,lng:number):Observable<Parking[]>{
    return this.http.get<Parking[]>(`${this.apiUrl}/search`,{
      params : {
        latitude:lat.toString(),
        longitude :lng.toString()
      }
    })
  }














































}
