// Updated users-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DispatcherService } from '../../../services/dispatcher-service.service';
import { UserService } from '../services/user.service';
import { DISPATCHER_ACTIONS } from '../../../services/data/shared.constant';
import { UserItemComponent } from './user-item/user-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {User} from '../../../shared/interfaces/interfaces.general';
import {Role} from '../../../services/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  imports: [
    UserItemComponent,
    CommonModule,
    FormsModule,
    MatIcon
  ],
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  selectedRoles: string[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  allRoles = Object.values(Role);
  pageSizeOptions: number[] = [5, 10, 20];
  filtersExpanded: boolean = false;


  constructor(
    private readonly userService: UserService,
    private readonly dispatcher: DispatcherService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  toggleFilters(): void {
    this.filtersExpanded = !this.filtersExpanded;
  }
  private loadUsers(): void {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, true);

    this.userService.getAllUser().subscribe({
      next: (result) => {
        this.users = result.users;
        this.applyFilters();
        this.handleLoadingComplete();
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.handleLoadingComplete();
      }
    });
  }

  applyFilters(): void {
    // Apply search filter
    let filtered = this.users;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        (user.nom && user.nom.toLowerCase().includes(term)) ||
        (user.prenom && user.prenom.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    }

    // Apply role filter
    if (this.selectedRoles.length > 0) {
      filtered = filtered.filter(user =>
        this.selectedRoles.includes(user.role)
      );
    }

    this.filteredUsers = filtered;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onRoleChange(role: string): void {
    const index = this.selectedRoles.indexOf(role);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  private handleLoadingComplete(): void {
    this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER, false);
  }

  getUniqueIdentifier(user: User) {
    return user._id;
  }

  handleAction(event: { action: string, payload: any }) {
    switch (event.action) {
      case "VIEW_DETAILS":
        this.router.navigate(["/backoffice/users/details/" + event.payload]);
        break;
      case "DELETE_USER":
        this.userService.archiver(event.payload).subscribe({
          next: (data: any) => {
            if (data.success) {
              this.loadUsers();
            }
          }
        });
        break;
    }
  }
}
