import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  navCat1 = null;
  navCat2 = null;
  navCat3 = null;

  public PAGES: any  = [ ];

   menuDetailsList:any=[];

  

  constructor( ) {
    

    this.menuDetailsList=[
     
      {
        "name": "Admin",
        "icon":"person",
        "nav": [{
            "name": "User",
            "url": "button",
            "icon":"accessibility-outline",
          },
          {
            "name": "Role",
            "url": "/menu10",
            "icon":"accessibility-outline",
          }
        ]
    },
    {
      "name": "Organization",
      "icon":"business",
      "nav": [{
          "name": "Organization Type",
          "url": "/organization/type",
          "icon":"today",
        },
        {
          "name": "Organization Details",
          "url": "/organization/organizationDetails",
          "icon":"school",
        },
        {
          "name": "Stream",
          "url": "/organization/stream",
          "icon":"play",
        },
        {
          "name": "Facility",
          "url": "/organization/facility",
          "icon":"business",
        },
        {
          "name": "Course",
          "url": "/organization/course",
          "icon":"book",
        },
        {
          "name": "Amenities",
          "url": "/organization/amenities",
          "icon":"book",
        }
      ]
  },
    
    {
      "name": "Board/University",
      "url": "/board/boardDetails",
      "icon":"school",
    },
   
   

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
