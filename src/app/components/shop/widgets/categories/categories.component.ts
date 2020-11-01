import { CategoriesService } from './categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService:CategoriesService) { }
  public categories = [];

  ngOnInit() {
    this.loadCategories();
  }

  private loadCategories(){
    this.categoriesService.getAllCategories().toPromise().then(cate => {
      let data:any = cate;
      this.categories = data;
    }).catch(err => console.error(err));
  }

}
