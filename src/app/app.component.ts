import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSpinnerModule, NgxSpinnerService} from 'ngx-spinner';
import {DispatcherService} from './services/dispatcher-service.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DISPATCHER_ACTIONS} from './services/data/shared.constant';
import {AuthInterceptor} from './shared/token.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet ,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers : [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AppComponent {
  title = 'parking-pi';
  constructor(private dispatcherService: DispatcherService,
              private spinner:NgxSpinnerService
  ) {
    this.dispatcherService.dispatcher.pipe(takeUntilDestroyed())
      .subscribe((data:{action:DISPATCHER_ACTIONS,payload:any})=>{
        switch (data.action) {
          case DISPATCHER_ACTIONS.SPINNER:
            let isSpinning = data.payload as boolean;
            isSpinning? this.spinner.show() : this.spinner.hide();
            break;
          default :
            console.log("no action caught !!!")
        }
      })
  }

  ngOnInit() {

  }
}
