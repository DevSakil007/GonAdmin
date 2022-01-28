
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: "root",
  })

  export class FacilityService {
  getaddEditFacilityId(addEditFacilityId: string) {
    throw new Error('Method not implemented.');
  }
  
    // SAVE FACILITY
 saveFacility(payload): Observable<any> {
  const url = environment.facilityDetails + "saveFacility";
  return this.http.post(url, payload);
}

    constructor(private http: HttpClient){}

  // GET ALL FACILITY
  getAllFacility(): Observable<any> {
    const url = environment.facilityDetails + "viewAllFacility";
    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
  }
  
 // GET ORGANIZATION TYPE BY ID
 getFacilityById(id): Observable<any> {
  const url = environment.facilityDetails+"viewFacilityById?facilityId=" + id;
  return this.http.get(url, {}).pipe(
    map((res) => {
      let resData = res;
      return resData;
    })
  );
}
// UPDATE FACILITY
updateFacility(payload): Observable<any> {
    const url = environment.facilityDetails + "updateFacility";
  return this.http.post(url, payload);
}

// DELETE FACILITY
deleteFacility(id): Observable<any> {
  const url = environment.facilityDetails + "deleteFacility?FacilityId="+id;
return this.http.delete(url);



}
  }