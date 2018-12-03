import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild, NavigationExtras, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Utilities } from './utilities';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        const url: string = state.url;
        this.handleLogin(url);
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        const url = `/${route.path}`;
        this.handleLogin(url);
        return false;
    }

    // copies an object filtering out own properties
    copyObjectWithFilter(input: any, predicate: (any, string) => boolean ): any {
        const output = {};
        for (const propName in input) {
            if (predicate(input, propName)) {
                output[propName] = input[propName];
            }
        }
        return output;
    }

    handleLogin(url: string): boolean {

        const clientIdKey = 'client_id';
        const clientSecretKey = 'client_secret';

        const urlParamsAndFragment = Utilities.splitInTwo(url, '#');
        const urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

        const originalQueryParams = Utilities.getQueryParamsFromString(urlAndParams.secondPart);

        const postLoginQueryItems = this.copyObjectWithFilter(originalQueryParams, (value, propName) => {
            return value.hasOwnProperty(propName) && propName !== 'client_id' && propName !== 'client_secret';
        });

        const authQueryParams: NavigationExtras = {
            queryParams: {
                'client_id': originalQueryParams[clientIdKey],
                'client_secret': originalQueryParams[clientSecretKey] }
          };

        const postLoginQueryParams = new HttpParams({fromObject : postLoginQueryItems});

        // when redirecting back, drop the authentication parameters
        this.authService.loginRedirectUrl = urlAndParams.firstPart + postLoginQueryParams.toString();

        // use the parameters to log in
        this.router.navigate(['/auth'], authQueryParams);

        return false;
    }
}
