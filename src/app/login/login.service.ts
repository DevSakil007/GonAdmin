import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
   
  loginUser(userName,password){
    const url =environment.userController+"login?userName="+userName+"&password="+password;
    return this.http.get(url,{}).pipe(
      map((res)=>{
        let resData:any=res;
        console.log(res);

        return resData
      })
    )
  }
}
