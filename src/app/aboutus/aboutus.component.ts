import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('About NearLuk |  Indias Trusted Renting Portal');
    this.meta.addTags([
      { name: 'description', content: 'NearLuk is the one stop destination for all of your rental and lease property needs. Search and compare thousands of residential rental properties, apartments, hostels, office and commercial spaces with ease.' },
      { name: 'keywords', content: 'flats for rent, Apartments for rent, Properties for rent, house for rent, independent house for rent, office for rent,  commercial shops for rent,office space rental,rent coworking space' }
    ]);
  }

  ngOnInit() {

    window.scrollTo(0, 0)
  }

}