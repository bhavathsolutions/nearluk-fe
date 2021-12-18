import { Component, OnInit } from '@angular/core';
import { NearlukService } from '../../services/nearluk.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  // BiddingPropertys: any;
  userid: any;
  roleid: any;
  page: any = 0;
  BiddingPropertys: any[] = [];
  bidded: any;



  constructor(private nearlukservice: NearlukService, private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Bidding |  Property for lease | search property for rent | rent flats | villas | Commercial spaces |  House for rent | Flat for rent ');
    this.meta.addTags([
      { name: 'description', content: 'Registered users can bid the properties that are posted by the owner.' },
      { name: 'keywords', content: 'Nearluk, flat for rent in Hyderabad, flat for rent, flat for rent in Delhi, flat for rent in Mumbai, flat for rent in Bangalore' }
    ]);

   }

  Owner_Property_details(property_id: string) {

    // alert(property_id)

    this.router.navigate(['moredetails' + '/' + property_id])
  }

  onScroll() {
    // alert('hiii')
    this.page = this.page + 1;
    this.infinite();
  }


  // infinite() {
  //   this.nearlukservice.getBiddingPropertyDetails(this.userid,this.page).subscribe((data) => {
  //     // alert(JSON.stringify(data))
  //     this.BiddingPropertys = data.data;
  //     // console.log(data)
  //   })

  // }


  
infinite() {
  this.nearlukservice.getBiddingPropertyDetailsnew(this.userid, this.page).subscribe((data) => {
    this.bidded = data.data;
    for (var i = 0; i < this.bidded.length; i++) {
      this.BiddingPropertys.push(this.bidded[i]);
    }
  });
}




  ngOnInit() {

    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;
        this.infinite();
      });
    }
  }

}