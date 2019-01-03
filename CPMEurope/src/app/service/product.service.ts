import { Injectable } from '@angular/core';
import {MessageService} from "./message.service";
import {HttpClient} from "@angular/common/http";
import {Product} from "../class/product";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
}
