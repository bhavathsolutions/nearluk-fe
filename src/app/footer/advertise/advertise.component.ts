import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) { 
    this.title.setTitle('Advertise with us | House for rent | Flat for rent | homes for rent near me | villa near me | independent house ');
    this.meta.addTags([
      { name: 'description', content: 'Advertise with us by Posting or Sharing your Residential or Commercial Property' },
      { name: 'keywords', content: 'Colleges, Flats, NearLuk, Banquet Halls, Godowns, Hospitals, Hostels, Restaurants, Rental Property' }
    ]);

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}

}
