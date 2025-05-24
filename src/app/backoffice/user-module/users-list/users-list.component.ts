import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../../shared/interfaces/interfaces.general';
import {DispatcherService} from '../../../services/dispatcher-service.service';
import {UserService} from '../services/user.service';
import {DISPATCHER_ACTIONS} from '../../../services/data/shared.constant';
import {UserItemComponent} from './user-item/user-item.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [
    UserItemComponent,
    NgIf
  ],
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly dispatcher: DispatcherService,
    private readonly router :Router ) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);

    this.userService.getAllUser().subscribe({
      next: (result) => {

        console.log(result)
        this.users = result.users;
        console.log(this.users.length)
        this.handleLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.handleLoadingComplete();
        // Add error notification here
      }
    });
  }

  private handleLoadingComplete(): void {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
  }


  private executeAndReload(observable$: Observable<any>, successMsg?: string): void {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);
    observable$.subscribe({
      next: (res) => {
        console.log(successMsg || 'Action completed.', res);
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error during action:', err);
        this.handleLoadingComplete();
      }
    });
  }

  getUniqueIdentifier(user: User) {
    return user._id ;
  }

  handleAction($event: { action : string , payload : any }) {

  }
}
