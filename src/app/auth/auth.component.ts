import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Utilities } from '../services/utilities';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginInProgress = true;

  public loginFailed = false;

  public errorMessage = '';

  constructor(private authService: AuthService) {

   }

  ngOnInit() {
    this.login();
  }

  reset(): void {
  }

  login() {
    this.loginInProgress = true;
    const client_id = 'something';
    const client_secret = 'something-else';

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
