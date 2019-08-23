import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest, HttpHeaders, HttpResponse} from '@angular/common/http';
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
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + 'products',
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)});
    }

    saveProduct(product: Product): Observable<Product> {
        return this.http.post(this.baseUrl + 'products', product,
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    updateProduct(product): Observable<Product> {
        return this.http.put(this.baseUrl + `products${product.id}`, product,
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete(this.baseUrl + `products/${id}`,
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.baseUrl + 'orders', 
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)});
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete(this.baseUrl + `orders/${id}`,
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    updateOrder(order: Order): Observable<Order> {
        return this.http.put(this.baseUrl + `orders/${order.id}`, order,
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    saveOrder(order: Order, auth: boolean = false): Observable<Order> {

        if (auth && this.auth_token != null) {
            let headers = new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`);
        }
        return this.http.post(this.baseUrl + 'orders', order, 
        {headers: new HttpHeaders().set('Authorization', `Bearer<${this.auth_token}>`)})
        .pipe(map((res: any) => res));
    }

    authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post( this.baseUrl + 'login', { name: user, password: pass })
        .pipe(map((res: any) => {
            let r = res;
            this.auth_token = r.success ? r.token : null;
            return r.success;
        }));
    }

    private sendRequest(verb: HttpMethod, url: string, body?: Product | Order): Observable<Order> {
        return this.http.request(new HttpRequest(verb, this.baseUrl + url, body))
        .pipe(map((res: any) => res.json()));
    }
}

