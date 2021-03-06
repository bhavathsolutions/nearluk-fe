import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NearlukService } from '../services/nearluk.service';
import { featurefilters } from '../model/featurefilters';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-futureproperty',
  templateUrl: './futureproperty.component.html',
  styleUrls: ['./futureproperty.component.css']
})

export class FuturepropertyComponent implements OnInit {
  featured: any;
  details: any[] = [];
  page: any = 1;
  userid:any
  value:any;
  vproperty: any;
  items: any[] = [];

  filterObj: featurefilters;
  verification: { label: string; value: { id: number; name: string; code: string; }; }[];
  facing: { label: string; value: string[]; }[];
  featuredfilters: any;
  constructor(private acr: ActivatedRoute, private nearlukservice: NearlukService, private title: Title, private meta: Meta) {
    this.title.setTitle('Featured Properties | commercial space for rent | Residential property | properties in India | property websites India | rent websites India | Gated Community Apartments | Houses | Flats - NearLuk | Co - Living Spaces | Sharing Lives | Family Living - NearLuk ');
    this.meta.addTags([
      { name: 'description', content: 'We can get the required category of the properties with family living, gated communities, sharing spaces, bachelors living. | Living in a gated community house feels like you are living in your own exclusive neighborhood. You can enjoy the safety and social atmosphere. Browse our list of gated communities to find one that suits your needs. | The new way in the housing industry is co living spaces. These are apartments where people of all ages and backgrounds live together in a single building. The goal is to attract tenants who can learn from each other. ' },
      { name: 'keywords', content: 'flat for rent near me,  Nearluk, rented apartment, Villas, flat for rent, 1 bhk flat for rent, Hostels, Paying Guest, men s hostel near me | The new way in the housing industry is co living spaces. These are apartments where people of all ages and backgrounds live together in a single building. The goal is to attract tenants who can learn from each other. | The new way in the housing industry is co living spaces. These are apartments where people of all ages and backgrounds live together in a single building. The goal is to attract tenants who can learn from each other. ' }
    ]);

    this.filterObj = new featurefilters();

    this.facing = [
      { label: 'North', value: ['North'] },
      { label: 'South', value: ['South'] },
      { label: 'East', value: ['East'] },
      { label: 'West', value: ['West'] },
      { label: 'North East', value: ['North East'] },
      { label: 'North West', value: ['North West'] },
      { label: 'South East', value: ['South East'] },
      { label: 'South West', value: ['South West'] }


    ];
    this.verification = [
      { label: 'Verified', value: { id: 1, name: 'V', code: 'Verified' } },
      { label: 'Not Verified', value: { id: 2, name: 'N', code: 'Not Verified' } },

    ];
  }
  moredetails(propertyid) {
    window.open('moredetails' + '/' + propertyid)
  }

  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }


  submit() {

    this.page=1;
    this.vproperty=null;
    this.details = [];
    this.items=[];
    if(this.filterObj.value != undefined){
      this.filterObj.value=this.filterObj.value.name;
          }
    this.nearlukservice.Featuredfilters(this.filterObj,this.userid,this.page).subscribe((data) => {
      // this.details = data;
      this.vproperty=data;
      for (var j = 0; j < this.vproperty.length; j++) {
      
        // this.optionPropertyType.push(this.vproperty[j]);

    
    //     if(this.propertyList.indexOf(this.vproperty[j]) > -1) {
        
    // }
    
    if(this.items.indexOf(this.vproperty[j].propertyid) === -1) {

      this.items.push(this.vproperty[j].propertyid);

      this.details.push(this.vproperty[j]);
    }

      }
    })

  }

  checkedd(propertyid: any, chk: any) {
    var v1 = 0
    var v2 = 0
    var v3 = 0
    if (localStorage.getItem('compare1') == propertyid) {
      v1 = 1
      v2 = 1
      v3 = 1
    }
    else if (localStorage.getItem('compare2') == propertyid && v2 == 0) {
      v1 = 1
      v2 = 1
      v3 = 1
    }
    else if (localStorage.getItem('compare3') == propertyid && v3 == 0) {
      v1 = 1
      v2 = 1
      v3 = 1
    }
    if (localStorage.getItem('compare1') == null && v1 == 0) {
      localStorage.setItem('compare1', propertyid);
    }
    else if (localStorage.getItem('compare2') == null && v2 == 0) {
      localStorage.setItem('compare2', propertyid);
      v2 = 1
    }
    else if (localStorage.getItem('compare3') == null && v3 == 0) {
      localStorage.setItem('compare3', propertyid);
      v3 = 1
    }
    else if (localStorage.getItem('compare3') != null && localStorage.getItem('compare3') == propertyid) {
      chk.checked = false;
      localStorage.removeItem('compare3');
    }
    else if (localStorage.getItem('compare1') != null && localStorage.getItem('compare1') == propertyid) {
      chk.checked = false;
      localStorage.removeItem('compare1');
    }
    else if (localStorage.getItem('compare2') != null && localStorage.getItem('compare2') == propertyid) {
      chk.checked = false;
      localStorage.removeItem('compare2');
    }
    else {
      chk.checked = false;
      alert("Excedd the limit ...")
    }
  }


  infinite() {

    if(this.filterObj.value != undefined){
      this.filterObj.value=this.filterObj.value.name;
          }
    this.nearlukservice.Featuredfilters(this.filterObj,this.userid,this.page).subscribe((data) => {
      // this.details = data;

      this.vproperty=data;
      for (var j = 0; j < this.vproperty.length; j++) {
      
        // this.optionPropertyType.push(this.vproperty[j]);

    
    //     if(this.propertyList.indexOf(this.vproperty[j]) > -1) {
        
    // }
    
    if(this.items.indexOf(this.vproperty[j].propertyid) === -1) {

      this.items.push(this.vproperty[j].propertyid);

      this.details.push(this.vproperty[j]);
    }

      }

    })

    // this.nearlukservice.GetFeatured(this.featured,this.userid, this.page).subscribe((data) => {
    //   this.details = data.data;
    //   // console.log(JSON.stringify(data))
    // })
  }
  ngOnInit() {
    this.featured = this.acr.snapshot.params.id;
    this.filterObj.feateredType=this.featured;
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.infinite();
      })
    }
    else{
      this.infinite();
    }
   
  }

}
