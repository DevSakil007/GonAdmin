import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup
  constructor(
      private fb:FormBuilder,
      private loginService:LoginService,
      private route:Router
    ) {}
  ngOnInit() {
    this.loginForm=this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(value:any){
    console.log(value);
    let userName=value.userName
    let password=value.password
   
    this.loginService.loginUser(userName,password).subscribe((res:any)=>{
      if (res.status=="success") {
        localStorage.setItem('userId',res.resObject[0].user_id);
        localStorage.setItem('userName',res.resObject[0].user_Name);
        localStorage.setItem('userType',res.resObject[0].user_Type);
        this.route.navigate(['/organization'])
      }
      else if(res.status=="fail"){
        alert("Login fail !! Please provide correct information")
      }
      else{
        alert("Failed please try again..")
      }
      
    })
    
  }

}
