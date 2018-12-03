import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilities } from '../services/utilities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  public loginInProgress = true;

  public loginFailed = false;

  public errorMessage = '';

  private clientId: string = null;

  private clientSecret: string = null;

  loginStatusSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) {
      this.clientId = this.route.snapshot.queryParamMap.get('client_id');
      this.clientSecret = this.route.snapshot.queryParamMap.get('client_secret');
   }

  ngOnInit() {
    if (this.clientId !== null && this.clientId !== '' && this.clientSecret !== null && this.clientSecret !== '' ) {
      this.loginStatusSubscription = this.authService.getLoginStatusEvent().subscribe(isLoggedIn => {
        if (this.getShouldRedirect()) {
          this.authService.redirectLoginUser();
        }
      });
      this.login();
    } else {
      this.loginFailed = true;
      this.loginInProgress = false;
      this.errorMessage =
        'Не указаны параметры авторизации. ' +
        'Уточните ссылку для просмотра результатов у администратора и попробуйте еще раз.';
    }
  }

  ngOnDestroy() {
    if (this.loginStatusSubscription) {
      this.loginStatusSubscription.unsubscribe();
    }
  }

  reset(): void {
  }

  getShouldRedirect() {
    return this.authService.isLoggedIn && !this.authService.isSessionExpired;
  }

  login() {
    this.loginInProgress = true;
    const client_id = this.clientId;
    const client_secret = this.clientSecret;

    this.authService.loginAsWorkplace(client_id, client_secret)
      .subscribe(
        user => {
          setTimeout(() => {
            this.loginInProgress = false;
            this.reset();
          }, 500);
          console.log('Logged in as: ' + user.toString());
        },
        error => {
          this.loginInProgress = false;

          if (Utilities.checkNoNetwork(error)) {
            this.errorMessage = Utilities.noNetworkMessageCaption + ' ' + Utilities.noNetworkMessageDetail;
          } else {
            const errorMessage = Utilities.findHttpResponseMessage('error_description', error);
            if (errorMessage) {
              this.errorMessage = errorMessage;
            } else {
              this.errorMessage = error.statusText || error.status;
            }
            this.loginFailed = true;
          }
          setTimeout(() => {
            this.loginInProgress = false;
          }, 500);
        });
  }

}
