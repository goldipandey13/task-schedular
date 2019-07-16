import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlConstants {

    private serverUrl: string = environment.serverUrl;

    public SIGN_UP(): string {
        return `${this.serverUrl}/user/register`;
    }

    public SIGN_IN(): string {
        return `${this.serverUrl}/user/login`;
    }

    public TASKS(): string {
        return `${this.serverUrl}/task`;
    }

}