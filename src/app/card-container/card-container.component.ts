import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Observable } from 'rxjs/Rx';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  constructor(private prodServ: ProductService) { }
  
  products: Observable<Product[]>;

  ngOnInit() {
    this.products = this.prodServ.getProducts();
  }

}
