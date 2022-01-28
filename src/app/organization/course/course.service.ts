import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn:'root'
})
export class CourseService{
    constructor(private http: HttpClient) {}

    //   FOR GET ALL educationDetailsMst
    getAllCourse(): Observable<any> {
    
        const url = environment.organizationCourse + "viewAll";
    
        return this.http.get(url, {}).pipe(
          map((res) => {
            let resData = res;
            return resData;
          })
        );
      }

      saveCourse(payload): Observable<any> {
        const url = environment.organizationCourse + "save";
        return this.http.post(url, payload);
      }
    
       // UPDATE ORGANIZATION TYPE
       updateCourse(payload): Observable<any> {
        const url = environment.organizationCourse + "update";
        return this.http.put(url, payload);
      }







      getCourseByCourseId(id): Observable<any> {
        const url = environment.organizationCourse+"viewById?organizationCourseId=" + id;
        return this.http.get(url, {}).pipe(
          map((res) => {
            let resData = res;
            return resData;
          })
        );
      }





     deleteCourse(organizationCourseId):Observable<any>{

      const url = environment.organizationCourse+"delete?organizationCourseId="+organizationCourseId
      return this.http.delete(url,{}).pipe(
        map((res)=>{
          let resData:any=res;
          return resData
        })
      );
     }

     


}