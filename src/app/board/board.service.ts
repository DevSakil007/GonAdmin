import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";


@Injectable({
    providedIn: "root",
  })

  export class BoardService{
       getaddEditBoardId(addEditBoardId: string) {
        throw new Error('Method not implemented.');
       }

    // SAVE BOARD
    saveBoard(payload): Observable<any>{

        const url = environment.boardDetails + "saveBaordMst";
        return this.http.post(url, payload);
    }
    constructor(private http: HttpClient){}
    
    // GET ALL BOARD
    getAllBoard(): Observable<any>{
        const url = environment.boardDetails + "viewAllBoard";
    return this.http.get(url, {}).pipe(
      map((res) => {
        let resData = res;
        return resData;
      })
    );
    }
    // GET BOARD BY ID
    getBoardById(id): Observable<any> {
        const url = environment.boardDetails+"ViewBoardById?boardId=" + id;
        return this.http.get(url, {}).pipe(
          map((res) => {
            let resData = res;
            return resData;
          })
        );
      }
     // UPDATE BOARD
     updateBoard(payload): Observable<any> {
        const url = environment.boardDetails + "updateBoard";
      return this.http.post(url, payload);
    }
    // DELETE BOARD
    deleteBoard(id): Observable<any> {
      const url = environment.boardDetails + "deleteBoard?boardId="+id;
      return this.http.delete(url);


    }
  }