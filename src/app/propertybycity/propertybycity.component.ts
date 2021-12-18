import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NearlukService } from '../services/nearluk.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-propertybycity',
  templateUrl: './propertybycity.component.html',
  styleUrls: ['./propertybycity.component.css']
})
export class PropertybycityComponent implements OnInit {
  propertydetails: any[] = []
  images: any;
  page: any = 0;
  userid: any;
  spropertydetails: any;
  spropertytypes: any[];
  spropertytypes1: any[];
  spropertytypes2: any[];
  spropertytypes3: any[];
  spropertytypes4: any[];
  spropertytypes5: any[];
  spropertytypes6: any[];
  spropertytypes7: any[];
  spropertytypes8: any[];
  spropertytypes9: any[];
  onClickButton: any;


  constructor(private router: Router, private nearlukservice: NearlukService, private acr: ActivatedRoute, private title: Title, private meta: Meta) { 

    this.title.setTitle('Property by City - Search the property details by using city filters | Independent House For Rent In Hyderabad - NearLuk | House For Rent In Secunderabad - NearLuk | House for Rent In Mumbai | Apartment for Rent - NearLuk | House for Rent In Pune | Flat for Rent - NearLuk ');
    this.meta.addTags([
      { name: 'description', content: 'Find the perfect house for rent in hyderabad. Check out our selection of furnished houses, apartments, villas, studio apartments, penthouse, rentals with parking, and more.' },
      { name: 'keywords', content: 'NearLuk Hyderabad , secunderabad , NearLuk , New Delhi , Chennai , Mumbai , flat for rent , Visakhapatnam , Kolkata , Ahmadabad , Surat , Jaipur , Bangalore  | Find the perfect house for rent in hyderabad. Check out our selection of furnished houses, apartments, villas, studio apartments, penthouse, rentals with parking, and more. | Find the perfect house for rent in hyderabad. Check out our selection of furnished houses, apartments, villas, studio apartments, penthouse, rentals with parking, and more. | Find the perfect house for rent in hyderabad. Check out our selection of furnished houses, apartments, villas, studio apartments, penthouse, rentals with parking, and more. | Find the perfect house for rent in hyderabad. Check out our selection of furnished houses, apartments, villas, studio apartments, penthouse, rentals with parking, and more. ' }
    ]);
  }
  MoreDetails(propertyid: any) {
    window.open('moredetails' + '/' + propertyid)
    // this.router.navigate(['moredetails' + '/' + propertyid])

  }

  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }

  // infinite() {
  //   var cityid = this.acr.snapshot.params.cid;
  //   this.nearlukservice.getPropertiesByCity(cityid,this.userid,this.page).subscribe((data) => {
  //     this.propertydetails = data.data
  //     // alert(JSON.stringify(this.propertydetails))
  //   })

  // }


  click1(cityid: any, propertytypeid: any) {
    this.spropertydetails = []
    this.propertydetails = []
    this.onClickButton = propertytypeid;
    // var cityid = this.acr.snapshot.params.cid;
    this.nearlukservice.getPropertiesByCitynew1(cityid, this.userid, propertytypeid, this.page).subscribe((data) => {
      this.spropertydetails = data.data;
      // console.log(this.spropertydetails)
      for (var i = 0; i < this.spropertydetails.length; i++) {

        this.propertydetails.push(this.spropertydetails[i]);
      }
    });

  }

  infinite() {
    var cityid = this.acr.snapshot.params.cid;
    this.nearlukservice.getPropertiesByCitytypes(cityid, this.userid, this.page).subscribe((data) => {
      this.spropertytypes2 = data.data;
      this.spropertytypes3 = data.data;
      this.spropertytypes5 = data.data;
      this.spropertytypes7 = data.data;
      this.spropertytypes9 = data.data;
      this.spropertytypes = this.spropertytypes2.slice(0,12);
      this.spropertytypes1 = this.spropertytypes3.slice(13,25);
      this.spropertytypes4 = this.spropertytypes5.slice(26,38);
      this.spropertytypes6 = this.spropertytypes7.slice(39,50);
      this.spropertytypes8 = this.spropertytypes9.slice(51,90);
      this.click1(this.spropertytypes[0].id, this.spropertytypes[0].propertytypeid);
      // console.log(this.spropertydetails)
    })
    // this.nearlukservice.getPropertiesByCity(cityid, this.userid, this.page).subscribe((data) => {

    //   this.propertydetails.push(data.data)
    //   // console.log(this.propertydetails)
    // })

  }


  ngOnInit() {
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        // console.log(data.data)
        this.userid = data[0].userid;

        this.infinite();
      })
    } else {
      this.infinite();
    }

  }
}




