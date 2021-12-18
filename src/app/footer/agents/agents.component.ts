import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  constructor(private router: Router,private nearlukservice: NearlukService, private title: Title, private meta: Meta) {
    this.title.setTitle('An Agent is a person who acts as medium between Owner and Tenant');
    this.meta.addTags([
      { name: 'description', content: 'NearLuk Agent | Rental Property | Flat for rent | property | Hostels | Nearluk | Flat for rent ' },
      { name: 'keywords', content: 'flat for rent near me, Nearluk, rented apartment, 1 bhk flat for rent, Hostels, Paying Guest' }
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
