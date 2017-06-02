import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  constructor(private prodServ: CategoryService) { }

  ngOnInit() {
  }

  @Input() product: Category;
  @Input() addCategory: boolean;
  msg: string;
  msg1: string;

  updateCategory() {
    this.prodServ.updateCategory(this.product);
  }

  deleteCategory() {
    this.prodServ.deleteCategory(this.product);
  }

  addNew() {
    this.prodServ.addCategory(this.product);
  }
}
