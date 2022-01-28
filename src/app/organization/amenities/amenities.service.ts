import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class AmenitiesService{
    constructor(private http: HttpClient) {}

    // FOR GET ALL AMENITIES
    getAllAmenities(): Observable<any> {
    
        const url = environment.organizationAmenities + "viewAll";
    
        return this.http.get(url, {}).pipe(
          map((res) => {
            let resData = res;
            return resData;
          })
        );
      }

      // SAVE AMENITIES TYPE
      saveAmenities(payload): Observable<any> {
        const url = environment.organizationAmenities + "save";
        return this.http.post(url, payload);
      }
    
       // UPDATE AMENITIES TYPE
       updateAmenities(payload): Observable<any> {
        const url = environment.organizationAmenities + "update";
        return this.http.put(url, payload);
      }



      getAmenitiesByAmenitiesId(id): Observable<any> {
        const url = environment.organizationAmenities+"viewById?organizationAmenitiesId=" + id;
        return this.http.get(url, {}).pipe(
          map((res) => {
            let resData = res;
            return resData;
          })
        );
      }





     deleteAmenities(organizationAmenitiesId):Observable<any>{

      const url = environment.organizationAmenities+"delete?organizationAmenitiesId="+organizationAmenitiesId
      return this.http.delete(url,{}).pipe(
        map((res)=>{
          let resData:any=res;
          return resData
        })
      );
     }

     


}