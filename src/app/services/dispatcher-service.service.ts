import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {DISPATCHER_ACTIONS} from './data/shared.constant';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
   dispatcher = new Subject<{ action: DISPATCHER_ACTIONS, payload: any }>();
  constructor(
  ) {
    this.dispatcher.next({
      action: DISPATCHER_ACTIONS.START,
      payload: null
    });
  }
  dispatch(action: DISPATCHER_ACTIONS, payload?: any): void {
    this.dispatcher.next({ action, payload });
  }
}
