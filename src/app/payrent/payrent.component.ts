import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payrent',
  templateUrl: './payrent.component.html',
  styleUrls: ['./payrent.component.css']
})
export class PayrentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
