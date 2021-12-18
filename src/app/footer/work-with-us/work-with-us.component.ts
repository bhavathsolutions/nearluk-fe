import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-work-with-us',
  templateUrl: './work-with-us.component.html',
  styleUrls: ['./work-with-us.component.css']
})
export class WorkWithUsComponent implements OnInit {
  

  constructor( private router: Router, private title: Title, private meta: Meta) { 

    this.title.setTitle('Work With Us | Nearluk | Rental Property | Flat for rent | property | Nearluk ');
    this.meta.addTags([
      { name: 'description', content: 'If you are interested to join in NearLuk family, we are elated to work with you. ' },
      { name: 'keywords', content: 'Flats for rent, Farmlands, Nearluk, Industries, Workshops, Showrooms, Penthouses, Commercial spaces, Resorts ' }
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
