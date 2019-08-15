import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpParams, HttpEvent, HttpBackend, HttpClientModule, HttpSentEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {Cart} from './cart.model';
import {Order} from './order.model';
import {map} from 'rxjs/operators';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + 'products');
    }

    saveOrder(order: Order): Observable<Order> {
        return this.http.post(this.baseUrl + 'orders', order)
        .pipe(map((res: any) => res.json()));
        //return this.sendRequest('POST', 'orders', order);
    }

    private sendRequest(verb: HttpMethod, url: string, body?: Product | Order): Observable<Order> {
        return this.http.request(new HttpRequest(verb, this.baseUrl + url, body))
        .pipe(map((res: any) => res.json()));
    }
}

