import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/Rx';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {
  
  products: Observable<Product[]>;

  constructor(private prodServ: ProductService) { }

  ngOnInit() {
    this.products = this.prodServ.getProducts();
  }

  @Output() selectProduct = new EventEmitter<Product>();
  @Output() add = new EventEmitter<boolean>();

  selectedProduct(product: Product) {
    this.selectProduct.emit(product);
    this.add.emit(false);
  }

  initializeNew() {
    this.selectProduct.emit(this.prodServ.initializeNew());
    this.add.emit(true);
  }
  
}
