import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ClientService {
    data: any;
    apiUrl = 'http://192.168.25.7:4000';

    constructor(public http: Http) {
        console.log('Hello ClientService Provider');
    }

    load(reload) {
        if (this.data && !reload) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get(`${this.apiUrl}/client`)
                .map(res => res.json())
                .subscribe(data => {
                    // cache
                    this.data = data.clients;

                    resolve(this.data);
                });
        });
    }

    save(data) {
        return new Promise(resolve => {
            this.http.post(`${this.apiUrl}/client`, data)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    destroy(id) {
        return new Promise(resolve => {
            this.http.delete(`${this.apiUrl}/client/${id}/destroy`)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
}
