import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit {

  products: Observable<Category[]>;

  constructor(private prodServ: CategoryService) { }

  ngOnInit() {
    this.products = this.prodServ.getCategorys();
  }

  @Output() selectCategory = new EventEmitter<Category>();
  @Output() add = new EventEmitter<boolean>();

  selectedCategory(product: Category) {
    this.selectCategory.emit(product);
    this.add.emit(false);
  }

  initializeNew() {
    this.selectCategory.emit(this.prodServ.initializeNew());
    this.add.emit(true);
  }

}
