import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent {

  recipeId: string = ""
  recipe: any = {}
  allRelatedRecipies: any = []
  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.recipeId = res.id
      this.getRecipe(this.recipeId)
    })
  }

  getRecipe(recipeId: string) {
    this.api.ViewRecipeAPI(recipeId).subscribe((res: any) => {
      this.recipe = res
      this.getRelatedRecipies(this.recipe.cuisine)

    })
  }

  getRelatedRecipies(cuisine: string) {
    this.api.relatedRecipeAPI(cuisine).subscribe((res: any) => {
      if (res.length > 1) {
        this.allRelatedRecipies = res.filter((item: any) => item.name != this.recipe.name)
        console.log(this.allRelatedRecipies);

      } else {
        this.allRelatedRecipies = []
      }
    })
  }

  // downloadRecipe() {
  //   this.api.downloadRecipeAPI(this.recipeId, this.recipe).subscribe((res: any) => {
  //     alert("recipe download")
  //     this.generatePdf()
  //   })
  // }

  // generatePdf() {
  //   const pdf = new jspdf()
  //   pdf.setFontSize(16)
  //   pdf.setTextColor("blue")
  //   pdf.text(this.recipe.name, 10, 10)
  //   pdf.setFontSize(12)
  //   pdf.setTextColor("black")
  //   pdf.text(`Cuisine: ${this.recipe.cuisine}`, 10, 15)
  //   pdf.text(`Servings: ${this.recipe.servings}`, 10, 20)
  //   pdf.text(`Mode of Cooking: ${this.recipe.difficulty}`, 10, 25)
  //   pdf.text(`Toatl preperation time: ${this.recipe.prepTimeMinutes}`, 10, 30)
  //   pdf.text(`Toatl cooking time: ${this.recipe.cookTimeMinutes}`, 10, 35)
  //   pdf.text(`Calories: ${this.recipe.caloriesPerServing}`, 10, 40)

  //   let head = [['Ingredients Needed', 'Cooking Instructions']]
  //   let body = []
  //   body.push([this.recipe.ingredients, this.recipe.instructions])
  //   autoTable(pdf, { head, body, startY: 50 })
  //   pdf.output('dataurlnewwindow')
  //   pdf.save('recipe.pdf')
  // }



saveRecipe(){
  this.api.saveRecipeAPI(this.recipeId,this.recipe).subscribe({
    next:(res:any)=>{
      alert("Recipe added to your collection")
    },
    error:(reason:any)=>{
      alert(reason.error)
      console.log(reason.error);
      
    }
  })

}
}