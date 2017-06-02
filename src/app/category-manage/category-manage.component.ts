import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selectedCategory: Category;
  addBool: boolean;

  getSelectedCategory(event) {
    this.selectedCategory = event;
  }

  addOrUpdate(event) {
    this.addBool = event;
  }

}
