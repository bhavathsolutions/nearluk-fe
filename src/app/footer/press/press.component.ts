import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {

  constructor( private router: Router,private nearlukservice: NearlukService, private title: Title, private meta: Meta) { 
    this.title.setTitle('Press | Office Places | Nearluk | Renovation Buildings |Schools |Shopping Malls ');
    this.meta.addTags([
      { name: 'description', content: 'With the view property you can find 25 plus categories of Residential or Commercial properties.' },
      { name: 'keywords', content: 'Rental Property, Nearluk, Flat for rent, Colleges, Banquet Halls, Hospitals, Restaurants, Rental Property' }
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
