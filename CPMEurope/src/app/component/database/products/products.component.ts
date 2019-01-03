import { Component, OnInit } from '@angular/core';
import {Product} from "../../../class/product";
import {ProductService} from "../../../service/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = "Products";
  products: Product[];
  selectedProduct: Product;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products );
  }
}
