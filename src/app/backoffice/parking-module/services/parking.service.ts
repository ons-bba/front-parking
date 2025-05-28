import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parking } from '../../../shared/interfaces/parking.interface';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/api/parking';

  constructor(private http:HttpClient) { }

  getParking():Observable<Parking[]>{
    return this.http.get<Parking[]>(this.apiUrl)
  }
  deleteParking(id:string):Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/"+id)
  }
}
