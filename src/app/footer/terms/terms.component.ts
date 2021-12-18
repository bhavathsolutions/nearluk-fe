import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor( private router:Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Privacy NearLuk Terms Of Use | rental property in India | Property for lease | Commercial spaces');
    this.meta.addTags([
      { name: 'description', content: 'The Nearluk reserves the right to add to or alter these Terms from time to time, and each such modification shall be effective upon posting on the Website.' },
      { name: 'keywords', content: 'houses for rent, houses for rent near me, cheap apartments for rent, rental properties near me ' }
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
