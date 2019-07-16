import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AjaxUtils } from '../shared/ajax.util';
import { UrlConstants } from '../shared/url-constant';
import { ErrorService } from '../shared/error.service';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    constructor(
        private http: HttpClient,
        private urlConstant: UrlConstants,
        private ajaxUtils: AjaxUtils,
        private errorService: ErrorService
    ) { }

    getAllTasks() {
        return this.http
            .get(`${this.urlConstant.TASKS()}`, this.ajaxUtils.getHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

    createTask(task) {
        return this.http
            .post(`${this.urlConstant.TASKS()}`, task, this.ajaxUtils.getHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

    updateTask(id, task) {
        return this.http
            .post(`${this.urlConstant.TASKS()}/${id}`, task, this.ajaxUtils.getHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

    deleteTask(id) {
        return this.http
            .get(`${this.urlConstant.TASKS()}/${id}`, this.ajaxUtils.getHeaderOptions())
            .toPromise()
            .then((res: any) => res as any)
            .catch(error => {
                throw this.errorService.processError(error);
            });
    }

}