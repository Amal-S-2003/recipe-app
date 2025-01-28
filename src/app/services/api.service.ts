import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://localhost:4000"
  constructor(private http: HttpClient) { }

  // getAllRecipes
  getAllRecipesAPI() {
    return this.http.get(`${this.server_url}/all-recipes`);
  }

  addTestimonyAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }

  registerAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody)
  }
  loginAPI(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody)
  }
  // reqHeader-appendToken
  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if (token) {
      headers = headers.append('authorization', `Bearer ${token}`)
      console.log(headers);
      
    }
    
    return { headers }
  }

  // ViewRecipeAPI
  ViewRecipeAPI(recipeId: string) {
    console.log("aiiii",recipeId)
    this.appendToken()
    return this.http.get(`${this.server_url}/recipes/${recipeId}/view`, this.appendToken())
  }

  // relatedRecipeAPI
  relatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipe?cuisine=${cuisine}`, this.appendToken())
  }

  
  // downloadRecipeAPI
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody.this.appendToken())
  }
  // saveRecipeAPI
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody.this.appendToken())
  }


}


