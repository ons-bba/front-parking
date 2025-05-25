import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }
  getCurrentPosition():Promise<GeolocationPosition>{
  return new Promise((resolve,reject)=>{
    if(!navigator.geolocation){
      reject('geolocalisation non supporte par votre navigator');
      return;
    }
    const options = {
      enableHighAccuracy: true,
      timeout:5000,
    };
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(this.getErrorMessage(err)),
      options
    );
  });
}

private getErrorMessage(error:GeolocationPositionError):string{
  switch(error.code){
    case error.PERMISSION_DENIED:
      return 'vous avez refusé la geolocalisation';
    case error.POSITION_UNAVAILABLE:
      return 'Position indisponible';
    case error.TIMEOUT:
      return 'delai de requette dépassé'
    default:
      return 'Erreur inconue'
  }

}






}

