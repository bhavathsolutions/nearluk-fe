import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NearlukService } from '../services/nearluk.service';
import { Payment } from 'src/app/model/payment';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {









  pageHeader: string = 'Employee Details'





  paymentData: Payment;
  requestcount: any;
  notificatiosdisplay: boolean;
  logstatus: any;
  userid: any;
  // notifications: any;
  nomessage: string;
  notifyvisible: boolean;
  notifications: any[];
  notificationseen: any[] = [];

  lat: any;
  lng: any;
  compare1: any = 0;
  compare2: any = 0;
  compare3: any = 0;
  comparecount: any = 0;
  owner: boolean;
  admin: boolean;
  agent: boolean;
  roleid: any;
  notificationscount: any;
  notificationdata: any;
  imagepic: any;
  imagepic1: any;
  msgcount: any;
  messageArray: Array<{ user: String, message: String }> = [];
  checksession1: number;
  pricingData: any = [];

  starterPricingName: any;
  starterPricingAmount: any;
  nonCommercialPricingName: any;
  nonCommercialPricingAmount: any;
  commercialPricingName: any;
  commercialPricingAmount: any;
  eventsPricingName: any;
  eventsPricingAmount: any;

  featurespricingDetails: any;
  featurespricingname: any;
  vp1: any;
  vp2: any;
  vp3: any;
  vp4: any;


  constructor(
    private nearlukservice: NearlukService,
    private router: Router, private meta: Meta, private title: Title
  ) {
    this.title.setTitle('Post Your Property For Rental | Indias No 1 Property Portal - NearLuk');
    this.meta.addTags([
      { name: 'description', content: 'Post your rental property on NearLuk and reach out to genuine tenants. We have the expertise and experience to help you find the perfect renter.' },
      { name: 'keywords', content: 'post property list your property property listing website post property for rent property listing sites list property for rent post house for rent property posting sites post free ad for rent housing search websites listing home advertisement for rental property' }
    ]);

    this.paymentData = new Payment()
  }

  ngOnInit() {
    this.PricingDetails();
    // this.payment();
    this.featuresPricingDetails();
  }

  payData: any = []
  signature: any;
  // payment() {
  //   if (sessionStorage.getItem('user') != null) {
  //     this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
  //       if (data) {
  //         console.log(data)
  //         this.userid = data[0].userid;
  //         this.roleid = data[0].roleid;


  //         this.nearlukservice.payment(this.userid).subscribe(data => {
  //           this.payData = data


  //           // this.signature = (this.payData.data.signature)

  //           this.paymentData.appId = this.payData.data.appId;
  //           this.paymentData.orderId = this.payData.data.orderId;
  //           this.paymentData.orderAmount = this.payData.data.orderAmount;
  //           this.paymentData.orderCurrency = this.payData.data.orderCurrency;
  //           this.paymentData.orderNote = this.payData.data.orderNote;
  //           this.paymentData.customerName = this.payData.data.customerName;
  //           this.paymentData.customerEmail = this.payData.data.customerEmail;
  //           this.paymentData.customerPhone = this.payData.data.customerPhone;
  //           this.paymentData.returnUrl = this.payData.data.returnUrl;
  //           this.paymentData.notifyUrl = this.payData.data.notifyUrl;
  //           this.paymentData.signature  = this.payData.data.signature;
  //           this.paymentData.url  = this.payData.url;



  //           console.log("==============" + JSON.stringify(this.payData.data.signature))
  //           console.log("==============" + this.paymentData.appId )
  //           console.log(JSON.stringify(this.payData.url))
  //           // alert(data)
  //         });
  //       }
  //     });
  //   }

  // }

  /* PricingDetails */
  PricingDetails() {
    this.nearlukservice.pricingDetails().subscribe(data => {
      this.pricingData = data.data;
      // this.starterPricingName = this.pricingData[0].pricing_name;
      // this.starterPricingAmount = this.pricingData[0].pricing_amount;

      this.nonCommercialPricingName = this.pricingData[0].pricing_name;
      this.nonCommercialPricingAmount = this.pricingData[0].pricing_amount;

      this.commercialPricingName = this.pricingData[1].pricing_name;
      this.commercialPricingAmount = this.pricingData[1].pricing_amount;

      this.eventsPricingName = this.pricingData[2].pricing_name;
      this.eventsPricingAmount = this.pricingData[2].pricing_amount;
    });
  }
  /*FeaturesPricingDetails*/

  featuresPricingDetails() {
    this.nearlukservice.featuresPricingDetails().subscribe(data => {
      this.featurespricingDetails = data.data;
      // console.log(this.featurespricingDetails[13].features_pricing_name)
      // console.log(this.featurespricingDetails[13].v_p_1)
      // console.log(this.featurespricingDetails[13].v_p_2)
      // console.log(this.featurespricingDetails[13].v_p_3)
      // console.log(this.featurespricingDetails[13].v_p_4)
      this.featurespricingname = this.featurespricingDetails[0].features_pricing_name;
      this.vp1 = this.featurespricingDetails[0].v_p_1;
      this.vp2 = this.featurespricingDetails[0].v_p_2;
      this.vp3 = this.featurespricingDetails[0].v_p_3;
      this.vp4 = this.featurespricingDetails[0].v_p_4;
      this.featurespricingname = this.featurespricingDetails[1].features_pricing_name;
      this.vp1 = this.featurespricingDetails[1].v_p_1;
      this.vp2 = this.featurespricingDetails[1].v_p_2;
      this.vp3 = this.featurespricingDetails[1].v_p_3;
      this.vp4 = this.featurespricingDetails[1].v_p_4;
      this.featurespricingname = this.featurespricingDetails[2].features_pricing_name;
      this.vp1 = this.featurespricingDetails[2].v_p_1;
      this.vp2 = this.featurespricingDetails[2].v_p_2;
      this.vp3 = this.featurespricingDetails[2].v_p_3;
      this.vp4 = this.featurespricingDetails[2].v_p_4;
      this.featurespricingname = this.featurespricingDetails[3].features_pricing_name;
      this.vp1 = this.featurespricingDetails[3].v_p_1;
      this.vp2 = this.featurespricingDetails[3].v_p_2;
      this.vp3 = this.featurespricingDetails[3].v_p_3;
      this.vp4 = this.featurespricingDetails[3].v_p_4;
      this.featurespricingname = this.featurespricingDetails[4].features_pricing_name;
      this.vp1 = this.featurespricingDetails[4].v_p_1;
      this.vp2 = this.featurespricingDetails[4].v_p_2;
      this.vp3 = this.featurespricingDetails[4].v_p_3;
      this.vp4 = this.featurespricingDetails[4].v_p_4;
      this.featurespricingname = this.featurespricingDetails[5].features_pricing_name;
      this.vp1 = this.featurespricingDetails[5].v_p_1;
      this.vp2 = this.featurespricingDetails[5].v_p_2;
      this.vp3 = this.featurespricingDetails[5].v_p_3;
      this.vp4 = this.featurespricingDetails[5].v_p_4;
      this.featurespricingname = this.featurespricingDetails[6].features_pricing_name;
      this.vp1 = this.featurespricingDetails[6].v_p_1;
      this.vp2 = this.featurespricingDetails[6].v_p_2;
      this.vp3 = this.featurespricingDetails[6].v_p_3;
      this.vp4 = this.featurespricingDetails[6].v_p_4;
      this.featurespricingname = this.featurespricingDetails[7].features_pricing_name;
      this.vp1 = this.featurespricingDetails[7].v_p_1;
      this.vp2 = this.featurespricingDetails[7].v_p_2;
      this.vp3 = this.featurespricingDetails[7].v_p_3;
      this.vp4 = this.featurespricingDetails[7].v_p_4;
      this.featurespricingname = this.featurespricingDetails[8].features_pricing_name;
      this.vp1 = this.featurespricingDetails[8].v_p_1;
      this.vp2 = this.featurespricingDetails[8].v_p_2;
      this.vp3 = this.featurespricingDetails[8].v_p_3;
      this.vp4 = this.featurespricingDetails[8].v_p_4;
      this.featurespricingname = this.featurespricingDetails[9].features_pricing_name;
      this.vp1 = this.featurespricingDetails[9].v_p_1;
      this.vp2 = this.featurespricingDetails[9].v_p_2;
      this.vp3 = this.featurespricingDetails[9].v_p_3;
      this.vp4 = this.featurespricingDetails[9].v_p_4;
      this.featurespricingname = this.featurespricingDetails[10].features_pricing_name;
      this.vp1 = this.featurespricingDetails[10].v_p_1;
      this.vp2 = this.featurespricingDetails[10].v_p_2;
      this.vp3 = this.featurespricingDetails[10].v_p_3;
      this.vp4 = this.featurespricingDetails[10].v_p_4;
      this.featurespricingname = this.featurespricingDetails[11].features_pricing_name;
      this.vp1 = this.featurespricingDetails[11].v_p_1;
      this.vp2 = this.featurespricingDetails[11].v_p_2;
      this.vp3 = this.featurespricingDetails[11].v_p_3;
      this.vp4 = this.featurespricingDetails[11].v_p_4;
      this.featurespricingname = this.featurespricingDetails[12].features_pricing_name;
      this.vp1 = this.featurespricingDetails[12].v_p_1;
      this.vp2 = this.featurespricingDetails[12].v_p_2;
      this.vp3 = this.featurespricingDetails[12].v_p_3;
      this.vp4 = this.featurespricingDetails[12].v_p_4;
      this.featurespricingname = this.featurespricingDetails[13].features_pricing_name;
      this.vp1 = this.featurespricingDetails[13].v_p_1;
      this.vp2 = this.featurespricingDetails[13].v_p_2;
      this.vp3 = this.featurespricingDetails[13].v_p_3;
      this.vp4 = this.featurespricingDetails[13].v_p_4;
    });
  }
  paymentButton() {
    if (sessionStorage.getItem('user')) {
      this.router.navigate(['property'])
    }
    else {
      swal({
        title: 'You are not logged in!!',
        text: "Please login to post your property!!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#17a2b8',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Here'
      }).then((result) => {
        if (result.value) {
          sessionStorage.setItem("PP", "postProperty");
          this.router.navigate(['login'])
        }
      })
    }
  }





}
