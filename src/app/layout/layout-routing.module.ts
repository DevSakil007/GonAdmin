import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

const routes: Routes = [
  
  {
    path: "organization",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../organization/organization.module").then((m) => m.OrganizationModule),
      },
    ],
  },
  {
    path: "board",
    component: LayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
        import("../board/board.module").then((m) => m.BoardModule),
        },
    ],
  },
  {
    path: "myProfile",
    component: UserProfileComponent,
    
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
  
}
