import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-frontoffice',
  standalone:true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './frontoffice.component.html',
  styleUrl: './frontoffice.component.scss'
})
export class FrontofficeComponent {

}
