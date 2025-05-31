import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Place } from '../../../shared/interfaces/places.interface';


@Injectable({
  providedIn: 'root'
})
export class PlaceParkingService {
    private apiUrl = 'http://localhost:3000/api/place';

//     router.post('/', placeController.createPlace);
// router.get('/parking/:parkingId', placeController.getPlacesByParking);
// router.get('/:id', placeController.getPlaceById);
// router.patch('/:id', placeController.updatePlace);
// router.delete('/:id', placeController.deletePlace);

// prestation & parking endPoint
// app.use('/api/booking',bookingRouter);
// app.use('/api/prestations',prestationRouter);
// app.use('/api/parking',parkingRouter);
// app.use('/api/tarif',tarifRouter)
// app.use('/api/place',placeRouter); 

  constructor(private http : HttpClient) { }

  // créer une nouvelle place 

  createPlace (placeData : Omit<Place,'_id'>): Observable<Place>{
    return this.http.post<Place>(this.apiUrl,placeData)
  }


  //// Récupérer toutes les places d'un parking
  getPlacesByParking(parkingId: string): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/parking/${parkingId}`);
  }

  // Récupérer une place spécifique
  getPlaceById(id: string): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une place
  updatePlace(id: string, updates: Partial<Place>): Observable<Place> {
    return this.http.put<Place>(`${this.apiUrl}/${id}`, updates);
  }

  // Supprimer une place
  deletePlace(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }









}
