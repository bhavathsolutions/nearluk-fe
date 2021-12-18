import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-house-owners',
  templateUrl: './house-owners.component.html',
  styleUrls: ['./house-owners.component.css']
})
export class HouseOwnersComponent implements OnInit {

  constructor(private router: Router,private nearlukservice: NearlukService, private title: Title, private meta: Meta) {
    this.title.setTitle('House Owners | Nearluk | Flat for rent | Colleges | Banquet Halls | Hospitals | Restaurants | Rental Property ');
    this.meta.addTags([
      { name: 'description', content: 'The owners can post their property details for free in NearLuk. We provide the feature of Pay rent for the rental purpose between the Owner and Tenant ' },
      { name: 'keywords', content: 'Office Places, Nearluk, Renovation Buildings, Schools, Shopping Malls' }
    ]);

   }

  ngOnInit() {
   
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  })

}
}