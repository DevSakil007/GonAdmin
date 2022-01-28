import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class OrganizationDetailsService {
  constructor(private http: HttpClient) {}

//   FOR GET ALL ORGANIZATION DETAILS
  getAllOrganizationDetails(): Observable<any> {

    const url = environment.organizationDetails + "viewAll";

    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
  }


}