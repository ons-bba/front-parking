import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Tarif } from '../../../shared/interfaces/tarif.interface';


@Injectable({
  providedIn: 'root'
})
export class TarifService {




// route.post('/',tarifController.createTarif);
// route.get('/',tarifController.getAlltarifs);
// route.get('/:id',tarifController.getTarif);
// route.put('/:id',tarifController.updateTarif);
// route.delete('/:id',tarifController.deleteTarif);
// route.get('parking/:parkingId/active',tarifController.getActiveTarifsForParking);



  private apiUrl = 'http://localhost:3000/api/tarif'; // Adaptez à votre URL

  constructor(private http: HttpClient) {}


  // tarif.service.ts
getAllTarifs(): Observable<Tarif[]> {
  return this.http.get<Tarif[]>(`${this.apiUrl}`, {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}



  getTarifById(id: string): Observable<Tarif> {
    return this.http.get<Tarif>(`${this.apiUrl}/${id}`);
  }
}

