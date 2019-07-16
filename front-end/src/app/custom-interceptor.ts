import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('/login') || req.url.includes('/register')) {
            return next.handle(req);
        } else {
            const token = localStorage.getItem('token');
            req = req.clone({
                headers: new HttpHeaders({ 'Authorization': `JWT ${token}` })
            });

            return next.handle(req);
            // return Observable.fromPromise(this.handleAccess(req, next));
        }
    }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {
        let changedRequest = request;
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }
        const token = localStorage.getItem('token');
        if (token) {
            headerSettings['Authorization'] = 'JWT ' + token
        }
        headerSettings['Content-Type'] = 'application/json';
        // const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({
            setHeaders: headerSettings
        });
        return next.handle(changedRequest).toPromise();
    }

}
