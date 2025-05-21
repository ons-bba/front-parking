import { Component } from '@angular/core';
import {Router, NavigationEnd, RouterLink} from '@angular/router';
import { filter } from 'rxjs/operators';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  attemptedUrl = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.attemptedUrl = this.router.url;
    });
  }
}
