import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'   
})
export class HeaderComponent {

  loginUsername:String=""
  isLoggedIn:boolean=false

  constructor(private router:Router){}
  ngOnInit(){
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      this.isLoggedIn=true
      this.loginUsername=JSON.parse(sessionStorage.getItem("user")||"").username
    } else {
      this.loginUsername=""
      this.isLoggedIn=false

    }
  }

  logOut(){
    sessionStorage.clear()
    this.loginUsername=""
    this.isLoggedIn=false
    this.router.navigateByUrl('/')
  }
}
