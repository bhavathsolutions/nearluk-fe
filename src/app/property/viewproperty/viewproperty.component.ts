import { GMapsService } from './../../services/gmaps.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.component.html',
  styleUrls: ['./viewproperty.component.css']
})
export class ViewpropertyComponent implements OnInit {

  // viewProperty: any
  optionPropertyType: any
  images: any
  // page: any = 1;
  statename:any;
  cityname:any;
  userid:any;
  viewProperty: any[] = [];
  pdetails:any;
  page: any = 0;

  constructor(private arc: ActivatedRoute, private map: GMapsService, private nluk: NearlukService, private title: Title, private meta: Meta) { 
    this.title.setTitle('Houses & Apartments For Rent | Independent Houses | Pent Houses | Flats for Rent | 1 BHK | 2 BHK  | 3 BHK  Near Me - NearLuk | Commercial & Small Shops for Rent or Lease - NearLuk | Commercial Properties for Rent | Small Office Space for Lease | Office Space Rental | Co-Working Spaces for Rent - NearLuk | PG Hostels For Boys & Girls | Hostels Near Me - NearLuk ');
    this.meta.addTags([
      { name: 'description', content: 'Rent your dream house with NearLuk. Find your new home with the help of our curated database of rental properties all over india. Find the perfect place to live today! | Looking for a flat to rent? Find your dream home from thousands of properties on NearLuk. We have a wide range of options available. Check out top furnished flats and apartments for rent near you. | Choose your commercial shop for rent or lease within your budget on NearLuk. Explore the best Info now for property lease, rentals, deals and get the real property owners. | Are you looking for a commercial space for your business? We have a range of different commercial spaces available for rent. Contact us today for more information on leasing your future space. | Are you looking for a co-working space or office space? We have a list of apartments, offices, shared spaces and more. Find the right office space for you in your city. | Are you looking for PG Hostels? NearLuk provides luxury and affordable hostels for both working professionals as well as students ' },
      { name: 'keywords', content: "house for rent, independent house for rent, 2 bhk house for rent, 1 bhk house for rent, 2 bhk house for rent near me,1 bhk house for rent near me,penthouse for rent, home for rent near me | flats for rent near me, rented flats near me, flats for rent apartment for rent 1 bhk flat for rent apartments for rent near me 1bhk flat on rent near me single room for rent near me flat on rent 2bhk flat near me 2bhk flat near me for rent flats on rent near me 1 bhk for rent near me 1 bhk flat for rent near me 2bhk flat rent near me | shop for rent near me shop rentals near me rented shop near me shop for rent shop on rent near me shop on rent small shop for rent near me commercial shops for rent small shops for rent warehouse for rent near me commercial space for rent near me empty shop for rent near me shop space for rent near me store for rent store for rent near me shop for lease | shop for rent near me shop rentals near me rented shop near me shop for rent shop on rent near me shop on rent small shop for rent near me commercial shops for rent small shops for rent warehouse for rent near me commercial space for rent near me empty shop for rent near me shop space for rent near me store for rent store for rent near me shop for lease | commercial space for rent commercial properties for rent rent commercial space space for rent commercial space commercial properties properties for rent | office for rent office space for rent near me office space rental office for rent near me working space near me desk rental office space on rent shared working space near me virtual office rental rent coworking space office on rent commercial office space for rent office space for lease co working space coworking space near me co working shared office space shared work space coworking office space | paying guest hostels near me hostel near me hostels for students dormitory near me mens hostel near me womens hostel near me pg hostel near me working womens hostel near me mens hostel hostels near me for gents ladies hostels women's hostel near me men's pg near me student's hostel "}
    ]);

  }

  moredetails(propertyid: any) {
    window.open('moredetails' + '/' + propertyid)
  }

  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }

  // infinite() {
  //   var type = this.arc.snapshot.params.type;
  //   var propertytype = type;
  //   var statename = this.map.state;
  //   var cityname = this.map.city;
  //   this.nluk.getCityidbyPropertytype(propertytype, statename, cityname, this.page).subscribe((data) => {
  //     this.viewProperty = data.data;
  //   })
  // }

  // infinite() {
  //   var type = this.arc.snapshot.params.type;
  //   var propertytype = type;
  //   this.statename = this.map.state;
  //    this.cityname = this.map.city;

  //   this.nluk.getCityidbyPropertytype(propertytype, this.statename,this.cityname, this.page).subscribe((data) => {
  //     this.viewProperty = data.data;
  //   })
  // }


  // infinite() {
  //   var type = this.arc.snapshot.params.type;
  //   var propertytype = type;
  //   this.statename = this.map.state;
  //    this.cityname = this.map.city;

  //   this.nluk.getCityidbyPropertytype(propertytype, this.statename,this.cityname,this.userid, this.page).subscribe((data) => {
  //     this.viewProperty = data.data;
  //   })
  // }


  infinite() {
    var type = this.arc.snapshot.params.type;
    var propertytype = type;
    this.statename = this.map.state;
    this.cityname = this.map.city;
    console.log(this.page)
    this.nluk.getCityidbyPropertytypenew(propertytype, this.statename, this.cityname, this.userid, this.page).subscribe((data) => {
      this.pdetails = data.data;
          for (var i = 0; i < this.pdetails.length; i++) {
            this.viewProperty.push(this.pdetails[i]);
       
        }


    })
  }

//   ngOnInit() {
//     if (sessionStorage.getItem('user') != null) {
//       this.nluk.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
//         // console.log(data.data)
//         this.userid = data[0].userid;
//         this.infinite();
//       })
//     }
//     this.infinite();
//   }
// }

ngOnInit() {
  if (sessionStorage.getItem('user') != null) {
    this.nluk.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      this.userid = data[0].userid;
      this.infinite();
    })
  } else {
    this.infinite();
  }

}
}