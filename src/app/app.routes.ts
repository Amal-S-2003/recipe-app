import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RecipesComponent } from './recipes/recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipesComponent } from './view-recipes/view-recipes.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"about",component:AboutComponent},
    {path:"contact",component:ContactComponent},
    {path:"recipes",component:RecipesComponent},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"saved-recipes",component:SavedRecipesComponent},
    {path:"recipes/:id/view",component:ViewRecipesComponent},
    {path:"**",component:HomeComponent},
];
 