import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-backoffice-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './backoffice-header.component.html',
  styleUrls: ['./backoffice-header.component.scss']
})
export class BackofficeHeaderComponent {
  constructor(private authService : AuthService , private router:Router) {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
