import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStreamService {

  constructor(private http :HttpClient) { }

  ///get All organization stream

  getAllOrganizationStream(){
    const url=env.organizationStream+"viewAll";
    return this.http.get(url,{}).pipe(
      map((res)=>{
        let resData=res;
        return resData;
      })
    )
  }

   // SAVE ORGANIZATION STREAM
   saveOrganizationStream(payload): Observable<any> {
    const url = env.organizationStream + "save";
    return this.http.post(url, payload);
  }

   // UPDATE ORGANIZATION STREAM
   updateOrganizationStream(payload): Observable<any> {
    const url = env.organizationStream + "update";
    return this.http.put(url, payload);
  }

  // GET ORGANIZATION STREAM BY ID
  getOrganizationStreamById(id): Observable<any> {
    const url = env.organizationStream+"viewDetailsById?streamId=" + id;
    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
  }
  // DELETE ORGANIZATION STREAM
  deleteOrganizationStream(id){
    const url=env.organizationStream+"delete?streamId="+id
    return this.http.delete(url)
  }

}
