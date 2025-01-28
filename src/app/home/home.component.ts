import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeRecipes: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllHomeRecipes()

  }
  getAllHomeRecipes() {

    this.api.getAllRecipesAPI().subscribe((res: any) => {
      this.homeRecipes = res.slice(0, 6)

    })
  }


}
