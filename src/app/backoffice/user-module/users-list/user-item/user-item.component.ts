import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {User} from '../../../../shared/interfaces/interfaces.general';
import {ModalService} from '../../../../shared/modals/modal.service';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {DatePipe, NgIf, NgStyle} from '@angular/common';
import {Sex} from '../../../../services/auth.service';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-user-item',
  standalone: true,
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
  imports: [
    MatCard,
    NgStyle,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon,
    DatePipe,
    NgIf,
    MatButton
  ],
  animations: [
    trigger('cardAnimation', [
      state('normal', style({background: 'rgba(255, 255, 255, 1)'})),
      state('hovered', style({background: 'rgba(250, 250, 250, 1)'})),
      transition('normal <=> hovered', animate('400ms ease-in-out')),
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          style({opacity: 1, transform: 'translateY(0)'}))
      ])
    ]),
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        paddingTop: '0',
        paddingBottom: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('expanded <=> collapsed',
        animate('400ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class UserItemComponent implements  OnChanges {
  @Input() user!: User;
  @Output() delete = new EventEmitter<any>();
  @Output() viewDetails = new EventEmitter<any>();
  @Output() archive = new EventEmitter<any>();
  hoverState: 'normal' | 'hovered' = 'normal';
  isExpanded = false;
  constructor(private readonly dialog : ModalService) {
  }
  get roleColor() {
    switch (this.user.role) {
      case 'ADMIN': return '#f44336';
      case 'CONDUCTEUR': return '#3f51b5';
      case 'OPERATEUR': return '#4caf50';
      default: return '#607d8b';
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].firstChange) {
      this.isExpanded = false;
    }
  }
  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  onDelete(event: MouseEvent , action : any , id :string) {
    event.stopPropagation()
    this.dialog.confirm({
      title : "Suppression d'un utilisateur !!",
      message :"Est tu sure de vouloir supprimer cet utilisateur !!",
      cancelButtonText : "Annuler",
      confirmButtonText :"Supprimer"
    }).subscribe(data=>{
      if(data) {
        this.delete.emit({action :action , payload : id});
      }
    })
  }

  onViewDetails(event: MouseEvent) {
    event.stopPropagation();
    this.viewDetails.emit({
      action: 'VIEW_DETAILS',
      payload: this.user._id
    });
  }

  onArchive(event: MouseEvent  , action : string , payload:string) {
    event.stopPropagation();
    this.archive.emit({action , payload  })
  }


  protected readonly Sex = Sex;
}
