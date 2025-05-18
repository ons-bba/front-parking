import {Component, inject} from '@angular/core';
import {BACKOFFICE_SIDEBAR_CONFIG} from './backoffice-sidebar-config';
import {MatListItem, MatNavList} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {BackofficeSideBarService} from './backoffice-side-bar.service';
import {BackofficeMenuItemComponent} from './backoffice-menu-item/backoffice-menu-item.component';

@Component({
  selector: 'app-backoffice-sidebar',
  standalone:true,
  imports: [
    NgForOf,
    AsyncPipe,
    BackofficeMenuItemComponent,
  ],
  templateUrl: './backoffice-sidebar.component.html',
  styleUrl: './backoffice-sidebar.component.scss'
})
export class BackofficeSidebarComponent {
  private sidebarService = inject(BackofficeSideBarService);
  isOpen$ = this.sidebarService.isOpen$;
  config$ = this.sidebarService.config$;

  ngOnInit() {
    this.sidebarService.updateConfig(BACKOFFICE_SIDEBAR_CONFIG);
  }

  toggle() {
    this.sidebarService.toggle();
  }
}
