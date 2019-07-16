import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AjaxUtils } from '../shared/ajax.util';
import { UrlConstants } from '../shared/url-constant';
import { ErrorService } from '../shared/error.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    constructor(
        private http: HttpClient,
        private urlConstant: UrlConstants,
        private ajaxUtils: AjaxUtils,
        private errorService: ErrorService
    ) { }

    signUp(user) {
        return this.http
            .post(`${this.urlConstant.SIGN_UP()}`, user, this.ajaxUtils.getPreloginHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

    signIn(user) {
        return this.http
            .post(`${this.urlConstant.SIGN_IN()}`, user, this.ajaxUtils.getPreloginHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

}