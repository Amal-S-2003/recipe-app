import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recipes',
    imports: [HeaderComponent, SearchPipe, FormsModule, NgxPaginationModule],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipes: any = []
  dummyRecipes: any = []
  searchKey: string = ""
  p: number = 1
  constructor(private api: ApiService,private router:Router) { }
  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesAPI().subscribe((res: any) => {
      this.allRecipes = res
      this.dummyRecipes = this.allRecipes
      console.log(this.allRecipes);

    })
  }

  filterRecipes(recipeType: string, recipeName: string) {
    this.allRecipes = this.dummyRecipes.filter((item: any) => item[recipeType].includes(recipeName))
  }

  viewRecipe(recipeId:string){
    if (sessionStorage.getItem('token')) {
      this.router.navigateByUrl(`recipes/${recipeId}/view`)
    } else {
      alert("Please login to explore our recipies")
    }
  }
}
