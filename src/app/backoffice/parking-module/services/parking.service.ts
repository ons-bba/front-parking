
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


  // parking.service.ts
getAllParkings(): Observable<Parking[]> {
  return this.http.get<Parking[]>(this.apiUrl, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}


  deleteParking(id:string):Observable<void>{
    return this.http.delete<void>(this.apiUrl+"/"+id)
  }

  // update parking backend api/parking/:id

  updateParking(id:string,parking:Parking):Observable<Parking>{
    return this.http.put<Parking>(`${this.apiUrl}/${id}}`,parking)
  }

  // get parking by id

  getParkingById(id:string):Observable<Parking>{
    return this.http.get<Parking>(`${this.apiUrl}/${id}`)    
  }

  createParking(parking:Parking):Observable<Parking>{
    return this.http.post<Parking>(`${this.apiUrl}/ajouter`,parking)
  }




}
