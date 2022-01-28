import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
    navCat1 = null;
    navCat2 = null;
    navCat3 = null;
  
    public PAGES: any  = [ ];
  
     menuDetailsList:any=[];
  
    
  
    constructor( ) {
      console.log("LeftSidebarComponent");
  
      this.menuDetailsList=[
       
        {
          "name": "Admin",
          "icon":"add-circle-outline",
          "nav": [{
              "name": "Button",
              "url": "button",
              "icon":"accessibility-outline",
            },
            {
              "name": "nav-2-1-1-2",
              "url": "/menu10",
              "icon":"accessibility-outline",
            }
          ]
      },
      {
        "name": "Organization",
        "icon":"add-circle-outline",
        "nav": [{
            "name": "Organization Type",
            "url": "/organization/type",
            "icon":"accessibility-outline",
          },
          {
            "name": "Organization Details",
            "url": "/organization/organizationDetails",
            "icon":"accessibility-outline",
          },
          {
            "name": "nav-2-1-1-2",
            "url": "/menu10",
            "icon":"accessibility-outline",
          }
        ]
    },
      {
        "name": "Single Menu Folder",
        "url": "folder",
        "icon":"accessibility-outline",
      },
      {
        "name": "Board/University",
        "url": "boardUniversity",
        "icon":"school",
      },
      {
        "name": "Board",
        "url": "boardDetails",
        "icon":"school",
      },
      {
        "name": "Admin2",
        "icon":"accessibility-outline",
        "nav": [{
            "name": "nav-2-1-1-1",
            "url": "/menu09",
            "icon":"accessibility-outline",
          },
          {
            "name": "nav-2-1-1-2",
            "url": "/menu10",
            "icon":"accessibility-outline",
          },
          {
            "name": "nav-2-1-1-2",
            "url": "/menu10",
            "icon":"accessibility-outline",
          }
        ]
    }
  
      ]
  
      
  
    }
  
    menuLevel1 = null;
    menuLevel2 = null;
    menuLevel3 = null;
  
    levelNav1(navX: string) {
      if (this.isNav1Displayed(navX)) {
        this.menuLevel1 = null;
      } else {
        this.menuLevel1 = navX;
      }
    }
  
    isNav1Displayed(navX: string) {
      return this.menuLevel1 === navX;
    }
  
    levelNav2(navX: string) {
      if (this.isNav2Displayed(navX)) {
        this.menuLevel2 = null;
      } else {
        this.menuLevel1 = navX;
        this.menuLevel2 = navX;
      }
    }
  
    isNav2Displayed(navX: string) {
      return this.menuLevel2 === navX;
    }
  
    levelNav3(navX: string) {
      if (this.isNav3Displayed(navX)) {
        this.menuLevel3 = null;
      } else {
        this.menuLevel2 = navX;
        this.menuLevel3 = navX;
      }
    }
  
    isNav3Displayed(navX: string) {
      return this.menuLevel3 === navX;
    }
  
    clearAccordionNav() {
      this.menuLevel1 = null;
      this.menuLevel2 = null;
      this.menuLevel3 = null;
    }
  
    
  
    menuCat1(res: string) {
      if (this.isMenu1Displayed(res)) {
        this.navCat1 = null;
      } else {
        this.navCat1 = res;
      }
    }
  
    isMenu1Displayed(res: string) {
      return this.navCat1 === res;
    }
  
    menuCat2(res: string) {
      if (this.isMenu2Displayed(res)) {
        this.navCat2 = null;
      } else {
        this.navCat1 = res;
        this.navCat2 = res;
      }
    }
  
    isMenu2Displayed(res: string) {
      return this.navCat2 === res;
    }
  
    menuCat3(res: string) {
      if (this.isMenu3Displayed(res)) {
        this.navCat3 = null;
      } else {
        this.navCat2 = res;
        this.navCat3 = res;
      }
    }
  
    isMenu3Displayed(res: string) {
      return this.navCat3 === res;
    }
  
    clearMenu() {
      this.navCat1 = null;
      this.navCat2 = null;
      this.navCat3 = null;
    }
  
    ngOnInit() {}
  

}
