import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuItem} from '../MenuItem.interface';
import {BackofficeSideBarService} from '../backoffice-side-bar.service';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';



@Component({
  selector: 'app-backoffice-menu-item',
  standalone: true,
  templateUrl: './backoffice-menu-item.component.html',
  styleUrl: './backoffice-menu-item.component.scss',
  imports: [
    RouterLink,
    RouterLinkActive , CommonModule ,
  ],
  animations: [
    trigger('rotateArrow', [
      state('rotated', style({transform: 'rotate(180deg)'})),
      state('default', style({transform: 'rotate(0)'})),
      transition('default <=> rotated', animate('300ms ease-in-out'))
    ]),
    trigger('submenu', [
      state('open', style({height: '*', opacity: 1})),
      state('closed', style({height: '0', opacity: 0})),
      transition('open <=> closed', animate('300ms ease'))
    ])
  ]
})
export class BackofficeMenuItemComponent {
  @Input() item!: MenuItem;
  @Input() level = 0;
  @Input() sidebarOpen = true;

  constructor(private sidebarService: BackofficeSideBarService) {}

  handleClick(event: Event) {
    event.preventDefault();

    if (!this.sidebarOpen) {
      this.sidebarService.toggle();
      setTimeout(() => {
        if (this.item.children) this.item.isOpen = true;
      }, 300);
    } else {
      if (this.item.children) this.item.isOpen = !this.item.isOpen;
    }
  }
}
