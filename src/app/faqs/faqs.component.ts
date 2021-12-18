import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {

  constructor( private title: Title, private meta: Meta) {
    this.title.setTitle('Faqs | NearLuk | commercial space for rent | Residential property | properties in India | property websites India | rent websites India ');
    this.meta.addTags([
      { name: 'description', content: 'Do you manage only residential property? Residential property is our specialty but we also manage small commercial properties and have several apartment complexes in our portfolio.' },
      { name: 'keywords', content: 'lease house in hyderabad, Nearluk, lease property in Hyderabad, rent property in India, search property for rent, rent flats,  villas, Commercial spaces' }
    ]);

   }

  ngOnInit() {
  }

}
