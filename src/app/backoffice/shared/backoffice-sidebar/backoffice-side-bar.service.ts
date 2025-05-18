import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MenuItem} from './MenuItem.interface';

@Injectable({
  providedIn: 'root'
})
export class BackofficeSideBarService {

  private _isOpen = new BehaviorSubject<boolean>(true);
  private _config = new BehaviorSubject<any[]>([]);

  isOpen$ = this._isOpen.asObservable();
  config$ = this._config.asObservable();

  toggle() {
    this._isOpen.next(!this._isOpen.value);
  }

  updateConfig(items: MenuItem[]) {
    this._config.next(items);
  }
}
