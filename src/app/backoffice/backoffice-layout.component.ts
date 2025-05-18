// backoffice-layout.component.ts
import {Component, HostBinding} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {BackofficeSidebarComponent} from './shared/backoffice-sidebar/backoffice-sidebar.component';
import {BackofficeHeaderComponent} from './shared/backoffice-header/backoffice-header.component';
import {Subscription} from 'rxjs';
import {BackofficeSideBarService} from './shared/backoffice-sidebar/backoffice-side-bar.service';



@Component({
  standalone: true,
  selector: 'app-backoffice-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    BackofficeSidebarComponent,
    BackofficeHeaderComponent,

  ],
  templateUrl: './backoffice-layout.component.html',
  styleUrls: ['./backoffice-layout.component.scss']
})
export class BackofficeLayoutComponent {

  private subscription: Subscription = new Subscription();
  @HostBinding('class.sidebar-expanded') sidebarExpanded = true;
  @HostBinding('class.sidebar-collapsed') sidebarCollapsed = false;
  constructor(private sidebarBackOfficeService : BackofficeSideBarService) { }


  ngOnInit() {
    this.subscription = this.sidebarBackOfficeService.isOpen$.subscribe(isOpen => {
      this.sidebarExpanded = isOpen;
      this.sidebarCollapsed = !isOpen;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
