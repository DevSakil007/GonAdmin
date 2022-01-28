import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board.component';
import { AddEditBoardComponent } from './add-edit-board/add-edit-board.component';
const routes: Routes = [
  {
     path: 'boardDetails',
     component: BoardComponent
   },
   {
    path: 'boardDetails/add',
    component: AddEditBoardComponent
  },
  {
    path: 'boardDetails/add/:id',
    component: AddEditBoardComponent
  },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  
  })
  export class BoardRoutingModule {
  
}