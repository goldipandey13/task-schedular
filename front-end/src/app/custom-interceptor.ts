import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headerName = 'Authorization';
        const respHeaderName = 'Authorization';

        if (req.url.includes('/login') || req.url.includes('/register')) {
            return next.handle(req);
        } else {
            let token;

            token = `JWT ${localStorage.getItem('token')}`;

            if (token && !req.headers.has(headerName)) {
                req = req.clone({
                    headers: req.headers.set(respHeaderName, token)
                });
            }
            return next.handle(req);
        }
    }
}
