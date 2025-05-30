import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FrontOfficeHeaderComponent} from './shared/front-office-header/front-office-header.component';

@Component({
  selector: 'app-frontoffice',
  standalone:true,
  imports: [
    RouterOutlet,
    FrontOfficeHeaderComponent
  ],
  templateUrl: './frontoffice.component.html',
  styleUrl: './frontoffice.component.scss'
})
export class FrontofficeComponent {

}
