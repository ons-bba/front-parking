import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../shared/interfaces/interfaces.general';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-front-office-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './front-office-header.component.html',
  standalone: true,
  styleUrl: './front-office-header.component.scss'
})
export class FrontOfficeHeaderComponent {
  currentUser!: User | null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
     this.authService.currentUser$.subscribe(user=>{
       this.currentUser = user as User;
     });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/front-office/profile']);
  }
  getUserImage() {
    if (this.currentUser?.image) {
      return "http://localhost:3000"+ this.currentUser.image;
    }
    return 'assets/default.png'; // Fallback image
  }
}
