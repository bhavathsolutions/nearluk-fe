import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.paramMap.subscribe((params: any) => {
      console.log(params);
    })  
  }

  ngOnInit() {
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl')
    console.log(returnUrl)
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      console.log('id parameter: ', id);
    } else {
      console.log('no id parameter');
    }
  }
  // rep(){
  //   this.router.snapshot.subscribe((params: any) => {
  //     console.log(params);
  //   })  
  // }

}
