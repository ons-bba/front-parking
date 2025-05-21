import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ModalService} from '../../shared/modals/modal.service';
import {DispatcherService} from '../../services/dispatcher-service.service';
import {AuthService} from '../../services/auth.service';
import {DISPATCHER_ACTIONS} from '../../services/data/shared.constant';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-verify-account',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './verify-account.component.html',
  standalone: true,
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent implements OnInit{
  loading = true;
  errorMessage: string | null = null;


  constructor(private router:Router ,private modals :ModalService,
              private dispatcher:DispatcherService, private authService : AuthService,private ac:ActivatedRoute)  {}
  ngOnInit(): void {
    this.loading = true;
    const token = this.ac.snapshot.paramMap.get('token');
    if (token) {
      this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER ,true)
      this.authService.verifyAccount(token).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER ,false)
          this.modals.showAlert("Le compte est activer, veuillez connecter à ton compte","success");
          this.router.navigate(["/login"])

        },
        error: (err:any) => {
          this.loading = false;
          this.dispatcher.dispatch(DISPATCHER_ACTIONS.SPINNER ,false);
          this.errorMessage = err.error.message || "Erreur lors de l’activation du compte.";
          this.modals.showAlert(err.error.message,"error")

        }
      });

    }else{
      this.modals.showAlert("Error has occured or link is unvalid!!","error")
    }
  }

}
