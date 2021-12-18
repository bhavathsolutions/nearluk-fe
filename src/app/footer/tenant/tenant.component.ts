import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Tenants | Nearluk | Flat for rent | rental property in India | rental flats | Commercial spaces ');
    this.meta.addTags([
      { name: 'description', content: 'The tenant can list down the best properties listed by the owner and agent with exact information on the location, facilities and amenities.' },
      { name: 'keywords', content: 'Villas, Farmlands, Nearluk, Industries, Workshops, Showrooms, Penthouses, Commercial spaces, Resorts' }
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
