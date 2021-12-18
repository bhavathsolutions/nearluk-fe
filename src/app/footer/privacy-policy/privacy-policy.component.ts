import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private router : Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Privacy Policy | Nearluk | flat for rent | Flats | Hospitals | Hostels | Rental Property ');
    this.meta.addTags([
      { name: 'description', content: 'This Privacy policy is subject to the terms of the Site Policy (User agreement) of NearLuk. We strive to offer a safe and secure user experience and recognize the requirement for protection and proper management of any information of the user(s) share with us.' },
      { name: 'keywords', content: 'Rental property near me, Nearluk, flat for rent in Hyderabad, flat for rent, flat for rent in Delhi, flat for rent in Mumbai, flat for rent in Bangalore, flat for rent in Ahmedabad' }
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
