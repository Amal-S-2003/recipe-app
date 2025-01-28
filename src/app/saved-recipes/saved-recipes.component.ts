import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-saved-recipes',
    imports: [HeaderComponent,RouterLink],
    templateUrl: './saved-recipes.component.html',
    styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
    allRecipes: any = []
    constructor(private api: ApiService) { }

    ngOnInit() {
        this.getAllSavedRecipes()
    }

    getAllSavedRecipes() {
        this.api.getSavedRecipeAPI().subscribe((res: any) => {
            this.allRecipes = res
            console.log("this.allRecipes", this.allRecipes);

        })
    }
    removeRecipe(id:string){
        this.api.removeSavedRecipeAPI(id).subscribe((res:any)=>{
            this.getAllSavedRecipes()
        })
    }
}
