import { Router } from '@angular/router';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';
import { Payment } from "src/app/model/payment";
import { NgxSpinnerService } from "ngx-spinner";



import swal from 'sweetalert2';
@Component({
  selector: 'app-myproperty',
  templateUrl: './myproperty.component.html',
  styleUrls: ['./myproperty.component.css']
})
export class MypropertyComponent implements OnInit {
  userid: any
  myproperty: any[] = [];
  roleid: any;
  page: any = 0;
  showSpinner;
  vmyproperty: any;
  paymentpost: Payment;
  payData: any = []
  priceData: any = [];
  categoryName: any;
  localpropertyid: any;
  orderDays: any;
  orderExpireDate: any;
  showPayButton = false;



  constructor(private nearlukservice: NearlukService, private router: Router, private toastr: ToastrService, private title: Title, private meta: Meta, private spinner: NgxSpinnerService
  ) {
    this.title.setTitle('My property | Nearluk | flat for rent | Shop for rent | House for rent | retail space for rent ');
    this.meta.addTags([
      { name: 'description', content: 'The owner can post the property which he seeks to be occupied and can view the property and the tenant can get the clear view of the property and can communicate with Owner.' },
      { name: 'keywords', content: 'Houses for rent near me, Nearluk , houses for rent , duplex , rental properties , studio apartments , villa near me , independent house' }
    ]);

    this.showSpinner = true;
    this.paymentpost = new Payment();


  }


  MoreDetails(propertyid: any) {
    window.open('moredetails' + '/' + propertyid)
    // this.router.navigate(['moredetails' + '/' + propertyid])

  }

  contactAgent(property_id, cityname) {
    sessionStorage.setItem("propCity", cityname)
    this.router.navigate(['contactagent/' + property_id]);
  }

  moredetails(propertyid: any) {
    // this.router.navigate(['moredetails' + '/' + propertyid])
    window.open('moredetails' + '/' + propertyid)

  }
  postProperty() {
    this.router.navigate(['property'])

  }


  update(id: any) {
    this.router.navigate(['updateproperty/' + id])
  }
  deleteProperty(id: any) {

    swal({
      title: 'Are you agree to DELETE!',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'confirm'
    }).then((result) => {
      if (result.value) {

        this.nearlukservice.deletemyprop(id).subscribe((data) => {

          if (data.result == true) {
            this.toastr.error('You have deleted property');
            this.router.navigateByUrl('/mypropertyref', { skipLocationChange: true }).then(() =>
              this.router.navigate(["myproperty"]));

            this.showSpinner = true;

            // this.router.navigate(['myproperty'])
          }

        })
        this.ngOnInit();

      }
    })


  }



  propertyStatusChange(event, property_id: any) {

    if (event.checked == true) {

      this.nearlukservice.propertystatus(property_id, 'Active').subscribe((data) => {
        // this.ngOnInit()
      })


      // alert(event.value)
    }
    else {
      this.nearlukservice.propertystatus(property_id, 'Inactive').subscribe((data) => {
        // this.ngOnInit()
      })
    }

  }



  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }



  // infinite() {
  //   this.nearlukservice.getproperty(this.userid, this.page).subscribe((data) => {
  //     this.myproperty = data.data;
  //     this.showSpinner = false;

  //     // console.log(data)
  //   });

  // }

  buttonShow: any = [];
  infinite() {
    this.nearlukservice.getpropertynew(this.userid, this.page).subscribe((data) => {
      if (data['result']) {
        this.vmyproperty = data.data;
        this.showSpinner = false;
        //console.log(JSON.stringify(data.data));
        
        for (var i = 0; i < this.vmyproperty.length; i++) {
          this.buttonShow[i] = true;

          this.myproperty.push(this.vmyproperty[i]);
        }
        // console.log(JSON.stringify(this.myproperty))
      } else {
        // console.log("BKSALALSASL")
      }
    }
    );
    // this.nearlukservice.getproperty(this.userid, this.page).subscribe((data) => {
    //   this.myproperty = data.data;
    //   this.showSpinner = false;



    // });
    // console.log(this.buttonShow);
  }



  propertyPayment(property_id: any, index: any) {
    this.spinner.show();
    for (let i = 0; i < this.myproperty.length; i++) {
      if (index == i) {
        this.buttonShow[i] = false;
      }
      else {
        this.buttonShow[i] = true;
      }
    }

    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
          this.spinner.show();
          this.nearlukservice.payment(this.userid, property_id).subscribe(data => {
            this.spinner.show();
            
            if (data.result === true) {
              this.payData = data;
              this.priceData = data;
              this.categoryName = this.priceData.pricingData.categoryName;
              this.orderDays = this.priceData.pricingData.orderDays;
              this.orderExpireDate = this.priceData.pricingData.orderExpireDate;
              this.localpropertyid = this.priceData.pricingData.propertyId;
              this.paymentpost.appId = this.payData.data.appId;
              this.paymentpost.orderId = this.payData.data.orderId;
              this.paymentpost.orderAmount = this.payData.data.orderAmount;
              this.paymentpost.orderCurrency = this.payData.data.orderCurrency;
              this.paymentpost.orderNote = this.payData.data.orderNote;
              this.paymentpost.customerName = this.payData.data.customerName;
              this.paymentpost.customerEmail = this.payData.data.customerEmail;
              this.paymentpost.customerPhone = this.payData.data.customerPhone;
              this.paymentpost.returnUrl = this.payData.data.returnUrl;
              this.paymentpost.notifyUrl = this.payData.data.notifyUrl;
              this.paymentpost.signature = this.payData.data.signature;
              this.paymentpost.url = this.payData.url;
              this.showPayButton = true;
              this.spinner.hide();
            }
            this.spinner.hide();
          });
        } else {
          this.spinner.hide();
        }
      }, error => {
        this.spinner.hide();
      });
    }
  }

  ngOnInit() {


    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        // this.userid = data.data[0].userid;
        // this.roleid = data.data[0].roleid;
        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
          setTimeout(() => {
            this.infinite();

          }, 500);
        }
        else {
          localStorage.removeItem('user');
          sessionStorage.removeItem('user')

          this.router.navigate(['login']);
        }



      });
    }

    else {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user')

      this.router.navigate(['login']);
    }





    // let userid = 1

  }

}
