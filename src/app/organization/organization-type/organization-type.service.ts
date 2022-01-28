
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: "root",
  })
export class OrganizationService {


  
  constructor(private http: HttpClient) {}
   
  
// GET ALL ORGANIZATION TYPE
  getAllOrganizationType(): Observable<any> {

    const url = environment.organizationType + "viewAllOrganizationType";
    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
  }

  // SAVE ORGANIZATION TYPE
  saveOrganizationType(payload): Observable<any> {
    const url = environment.organizationType + "save";
    return this.http.post(url, payload);
  }

  // UPDATE ORGANIZATION TYPE
   updateOrganizationType(payload): Observable<any> {
    const url = environment.organizationType + "update";
    return this.http.post(url, payload);
  }

  // DELETE ORGANIZATION TYPE
  deleteOrganizationType(id): Observable<any> {
    const url = environment.organizationType + "delete?organizationTypeId="+id;
    return this.http.delete(url).pipe(
      map((res) => {
        let resData = res;
        console.log(resData);
        return resData;
      })
    );
  }
  

  // GET ORGANIZATION TYPE BY ID
  getOrganizationTypeById(id): Observable<any> {
    const url = environment.organizationType+"viewOrganizationTypeDetailsByOrganizationTypeId?organizationTypeId=" + id;
    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
  }


}