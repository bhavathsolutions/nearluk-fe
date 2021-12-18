import { Router } from '@angular/router';
import { property } from './../../model/property';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GMapsService } from 'src/app/services/gmaps.service';
import { MapsAPILoader } from '@agm/core';
import { postmap } from 'src/app/model/propertymap';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage } from 'ng2-image-compress';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { Payment } from "src/app/model/payment";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

class Aminity {
  id: number;
  amName: string;
}
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
declare var google: any;

@Component({
  selector: 'app-propertys',
  templateUrl: './propertys.component.html',
  styleUrls: ['./propertys.component.css']
})
export class PropertysComponent implements OnInit {

  paymentpost: Payment;
  imgApi = environment.api;

  firstFormGroup: FormGroup;
  residenceSecondFormGroup: FormGroup;
  officeandcommercialSecondFormGroup: FormGroup;
  hostelSecondFormGroup: FormGroup;
  sharingSecondFormGroup: FormGroup;
  eventSecondFormGroup: FormGroup;
  playgroundSecondFormGroup: FormGroup;
  vehicleparkingSecondFormGroup: FormGroup;

  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourFormGroup: FormGroup;
  fiveFormGroup: FormGroup;


  showaddbutton: boolean = true;
  userid: any;

  property: property;
  lat: number = 20.5937;
  lng: number = 78.9629;
  markers: marker[];
  optionPropertyType: any;
  amenitiesGet: any[];
  facilitiesGet: any;
  facilitiesarray: any = [];
  facilitiescount: number;
  amArray: any = [];
  amcount: number;
  count: number;
  uploadFiles: any[] = [];
  isUploadEnable: boolean;
  video: any;
  uploadedFiles: any[] = [];
  displayvideo: boolean;
  propertyvideo: any;
  addbutton: boolean = false;

  preferences: any = [];
  options: any;
  states: any = [];
  cities: any = [];
  area: any = [];
  country: any;
  state: any;
  city: any;
  isLinear = false;

  roleid: any;
  showbutton: boolean;
  minDate: Date;

  maxDate: Date;
  agemonth: boolean = false;
  age: any;
  postmap: postmap;

  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;
  event: any;
  event2: any;
  event3: any;
  event4: any;
  event5: any;
  event6: any;
  event7: any;
  event8: any;
  event9: any;

  eventCoverImage: any;
  coverimage = false;

  pricingData: any = [];

  enable: boolean = false
  payData: any = []
  signature: any;
  propCount = false;
  priceData: any = [];

  categoryName: any;
  orderDays: any;
  orderExpireDate: any;
  propertyPostCount: any = [];
  pCount: number;
  showPayButton = false;
  @ViewChild('stepper', { static: false }) private myStepper: MatStepper;
  isFreeAdd = false;
  bhktype: any;
  buildtype: any;
  furnishedtype: any;
  floortype: any;
  noise: any;
  features = [];
  rsfurnishing: any;
  cmfurnishing: any;
  sharetype: any;
  foodtype: any;
  alcoholtype: any;
  foodprovisiontype: any;
  decorationtype: any;
  otherpolicietype: any;
  eventtype: any;
  halltype: any;
  hostelterms: any;
  playgroundterms: any;
  eventfeatures: any;
  hostelac: any;
  hostelnonac: any;
  playgroundfeatures: any;
  vehiclefeatures: any;
  booking_date_arr: any = [];
  propertyshowby: any;
  smoking: any;
  drinking: any;
  propertyrent: any;
  securitydeposit: any;





  dropdownSettings: IDropdownSettings;
  furnishingsdropdownSettings: IDropdownSettings;
  commanfurnishingsdropdownSettings: IDropdownSettings;
  sharetypedropdownSettings: IDropdownSettings;
  foodtypedropdownSettings: IDropdownSettings;
  alcoholtypedropdownSettings: IDropdownSettings;
  foodprovisiontypedropdownSettings: IDropdownSettings;
  decorationtypedropdownSettings: IDropdownSettings;
  otherpolicietypedropdownSettings: IDropdownSettings;
  eventtypedropdownSettings: IDropdownSettings;
  halltypedropdownSettings: IDropdownSettings;
  hosteltermsdropdownSettings: IDropdownSettings;
  playgroundtermsdropdownSettings: IDropdownSettings;
  eventfeaturesdropdownSettings: IDropdownSettings;
  hostelacdropdownSettings: IDropdownSettings;
  hostelnonacdropdownSettings: IDropdownSettings;
  playgroundfeaturesdropdownSettings: IDropdownSettings;
  vehiclefeaturesdropdownSettings: IDropdownSettings;


  featuresArray = [];
  furnishingsArray = [];
  commonfurnishingsArray = [];
  sharetypeArray = [];
  foodtypeArray = [];
  alcoholprovisionArray = [];
  foodprovisionArray = [];
  decorationprovisionArray = [];
  otherpoliciesArray = [];
  eventtypeArray = [];
  halltypeArray = [];
  hosteltermsandpolicyArray = [];
  playgroundtermsandpolicyArray = [];
  eventfeaturesofvenueArray = [];
  hostelacArray = [];
  hostelnonacArray = [];
  playgroundfeaturesArray = [];
  vehiclefeaturesArray = [];






  constructor(
    private nearlukservice: NearlukService,
    public router: Router,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private gservice: GMapsService,
    private __loader: MapsAPILoader,
    private __zone: NgZone,
    private title: Title,
    private meta: Meta) {
    this.title.setTitle('Post free add | flats to rent near me | rental property | 1bhk flat on rent | 2bhk flat on rent | property for lease ');
    this.meta.addTags([{ name: 'description', content: 'Advertise with us by Posting or Sharing your Residential or Commercial Property' }, { name: 'keywords', content: 'flat for rent near me, flat for rent, 1 bhk flat for rent, Paying Guest, men s hostel near me, boys hostel, women s hostel ' }]);
    this.property = new property();
    this.postmap = new postmap();
    this.paymentpost = new Payment();
  }





  ngOnInit() {

    this.property.propertyTypeId = null;
    this.property.preference = null;

    this.getCoutries();
    this.getPropertyCategory();
    this.propertyPostingCount();

    this.dateValidation();
    this.sessionStorage();

    this.getBhkTypes();
    this.getBuildingTypes();
    this.getFurnishedType();
    this.getFloorType();
    this.getNoiseLevel();
    this.getFeatures();
    this.getResidenceFurnishings();
    this.getCommonFurnishings();
    this.getShareTypes();
    this.getFoodType();
    this.getAlcoholType();
    this.getFoodprovisionType();
    this.getDecorationprovisionType();
    this.getOtherpoliciesType();
    this.getEventTypes();
    this.getHallTypes();
    this.getHosteltermsandpolicies();
    this.getPlaygroundtermsandpolicies();
    this.getEventFeaturesofvenue();
    this.getHostelac();
    this.getHostelnonac();
    this.getPlaygroundfeatures();
    this.getVehiclefeatures();
    this.getPropertyshownby();
    this.getSmoking();
    this.getDrinking();
    this.getPropertyrent();
    this.getPropertysecuritydeposit();

  }

  ngDoCheck() {
    if (localStorage.getItem('user') == null) {
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
      this.router.navigate(['/login'])
    }
  }


  openDialogForIsFreeAdOrPaid(isFreeOrPaid) {
    const dialogRef = this.dialog.open(isFreeOrPaid, {
      disableClose: true,
      // height: '600px',
      // width: '800px',
      autoFocus: false,
    });
  }

  paidAd() {
    this.dialog.closeAll();
    this.propCount = true;
    this.myStepper.next();
  }

  /* ---------------------------------------- ADD PROPERTY ---------------------------------------------- */

  addProperty() {
    this.spinner.show();
    this.dialog.closeAll();
    this.onUpload();
    this.spinner.hide();
  }

  /* ----------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------- UPLOAD IMAGES ---------------------------------------------- */
  onUpload() {
    this.spinner.show();
    if (this.eventCoverImage != null && this.eventCoverImage.files.length > 0) {
      this.showaddbutton = false;
      this.uploadImage(this.eventCoverImage);
      this.uploadImage(this.event);
      if (this.event2) {
        this.uploadImage(this.event2);
      }
      if (this.event3) {
        this.uploadImage(this.event3);
      }
      if (this.event4) {
        this.uploadImage(this.event4);
      }
      if (this.event5) {
        this.uploadImage(this.event5);
      }
      if (this.event6) {
        this.uploadImage(this.event6);
      }
      if (this.event7) {
        this.uploadImage(this.event7);
      }
      if (this.event8) {
        this.uploadImage(this.event8);
      }
      if (this.event9) {
        this.uploadImage(this.event9);
      }
      // this.uploadImage(this.event2);
      // this.uploadImage(this.event3);
      // this.uploadImage(this.event4);
      // this.uploadImage(this.event5);
      // this.uploadImage(this.event6);
      // this.uploadImage(this.event7);
      // this.uploadImage(this.event8);
      this.spinner.hide();
    } else {
      this.showaddbutton = true;
      this.spinner.hide();
      this.toastr.error('please add cover image')
    }
    setTimeout(() => {
      this.spinner.show();
      this.uploadFinalData();
      this.spinner.hide();
    }, 2000);
    this.showaddbutton = false;
  }

  /* ---------------------------------------------------------------------------------------------------------- */
  /* ---------------------------------------- UPLOAD FINAL DATA ----------------------------------------------- */

  uploadFinalData() {

    this.spinner.show();
    this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      if (data.length > 0) {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;
        console.log(this.roleid);
      }



    });

    if (this.eventCoverImage != null && this.eventCoverImage.files.length > 0) {
      this.addbutton = true
      this.showaddbutton = false;
      this.isUploadEnable = true;
      this.property.userid = this.userid;
      this.property.facilitypost = this.facilitiesarray;
      this.property.amenitypost = this.amArray;
      this.property.image = this.imagearray;

      if (this.property.features) {
        for (var a = 0; a < this.property.features.length; a++) {
          this.featuresArray.push(parseInt(this.property.features[a].id));
        }
      };

      if (this.property.residencefurnishings) {
        for (var b = 0; b < this.property.residencefurnishings.length; b++) {
          this.furnishingsArray.push(parseInt(this.property.residencefurnishings[b].id));
        }
      };

      if (this.property.commonfurnishings) {
        for (var c = 0; c < this.property.commonfurnishings.length; c++) {
          this.commonfurnishingsArray.push(parseInt(this.property.commonfurnishings[c].id));
        }
      };

      if (this.property.sharetype) {
        for (var d = 0; d < this.property.sharetype.length; d++) {
          this.sharetypeArray.push(parseInt(this.property.sharetype[d].id));
        }
      };

      if (this.property.foodtype) {
        for (var e = 0; e < this.property.foodtype.length; e++) {
          this.foodtypeArray.push(parseInt(this.property.foodtype[e].id));
        }
      };

      if (this.property.alcoholprovision) {
        for (var f = 0; f < this.property.alcoholprovision.length; f++) {
          this.alcoholprovisionArray.push(parseInt(this.property.alcoholprovision[f].id));
        }
      };

      if (this.property.foodprovision) {
        for (var g = 0; g < this.property.foodprovision.length; g++) {
          this.foodprovisionArray.push(parseInt(this.property.foodprovision[g].id));
        }
      };

      if (this.property.decorationprovision) {
        for (var h = 0; h < this.property.decorationprovision.length; h++) {
          this.decorationprovisionArray.push(parseInt(this.property.decorationprovision[h].id));
        }
      };

      if (this.property.otherpolicies) {
        for (var i = 0; i < this.property.otherpolicies.length; i++) {
          this.otherpoliciesArray.push(parseInt(this.property.otherpolicies[i].id));
        }
      };

      if (this.property.eventtype) {
        for (var j = 0; j < this.property.eventtype.length; j++) {
          this.eventtypeArray.push(parseInt(this.property.eventtype[j].id));
        }
      };

      if (this.property.halltype) {
        for (var k = 0; k < this.property.halltype.length; k++) {
          this.halltypeArray.push(parseInt(this.property.halltype[k].id));
        }
      };

      if (this.property.hosteltermsandpolicy) {
        for (var l = 0; l < this.property.hosteltermsandpolicy.length; l++) {
          this.hosteltermsandpolicyArray.push(parseInt(this.property.hosteltermsandpolicy[l].id));
        }
      };

      if (this.property.playgroundtermsandpolicy) {
        for (var m = 0; m < this.property.playgroundtermsandpolicy.length; m++) {
          this.playgroundtermsandpolicyArray.push(parseInt(this.property.playgroundtermsandpolicy[m].id));
        }
      };

      if (this.property.eventfeaturesofvenue) {
        for (var n = 0; n < this.property.eventfeaturesofvenue.length; n++) {
          this.eventfeaturesofvenueArray.push(parseInt(this.property.eventfeaturesofvenue[n].id));
        }
      };

      if (this.property.hostelac) {
        for (var o = 0; o < this.property.hostelac.length; o++) {
          this.hostelacArray.push(parseInt(this.property.hostelac[o].id));
        }
      };

      if (this.property.hostelnonac) {
        for (var p = 0; p < this.property.hostelnonac.length; p++) {
          this.hostelnonacArray.push(parseInt(this.property.hostelnonac[p].id));
        }
      };

      if (this.property.playgroundfeatures) {
        for (var q = 0; q < this.property.playgroundfeatures.length; q++) {
          this.playgroundfeaturesArray.push(parseInt(this.property.playgroundfeatures[q].id));
        }
      };

      if (this.property.vehiclefeatures) {
        for (var r = 0; r < this.property.vehiclefeatures.length; r++) {
          this.vehiclefeaturesArray.push(parseInt(this.property.vehiclefeatures[r].id));
        }
      };

      // alert(JSON.stringify(this.property.eventtype.length))
      if (this.property.booking_date) {
        this.property.booking_date = '' + this.property.booking_date;
        this.booking_date_arr = this.property.booking_date.split(',');
        this.property.booking_date = this.booking_date_arr;
      }


      this.property.features = this.featuresArray;
      this.property.residencefurnishings = this.furnishingsArray;
      this.property.commonfurnishings = this.commonfurnishingsArray;
      this.property.sharetype = this.sharetypeArray;
      this.property.foodtype = this.foodtypeArray;
      this.property.alcoholprovision = this.alcoholprovisionArray;
      this.property.foodprovision = this.foodprovisionArray;
      this.property.decorationprovision = this.decorationprovisionArray;
      this.property.otherpolicies = this.otherpoliciesArray;
      this.property.eventtype = this.eventtypeArray;
      this.property.halltype = this.halltypeArray;
      this.property.hosteltermsandpolicy = this.hosteltermsandpolicyArray;
      this.property.playgroundtermsandpolicy = this.playgroundtermsandpolicyArray;
      this.property.eventfeaturesofvenue = this.eventfeaturesofvenueArray;
      this.property.hostelac = this.hostelacArray;
      this.property.hostelnonac = this.hostelnonacArray;
      this.property.playgroundfeatures = this.playgroundfeaturesArray;
      this.property.vehiclefeatures = this.vehiclefeaturesArray;


      if (this.userid != undefined) {

        this.nearlukservice.getaddressidsusingname(this.postmap).subscribe((data) => {
          this.spinner.show();
          // alert(JSON.stringify(data))
          this.property.countryId = data[0].country_id;
          this.property.stateId = data[0].state_id;
          this.property.cityId = data[0].city_id;
          this.property.areaId = data[0].area_id;

          // isfreead = 1
          // if (this.pCount > 0) {
          //   alert(this.pCount)
          //   this.property.isfreead = false;
          //   this.property.status = "Deactive";
          // } else {
          //   this.property.status = "Active";
          //   this.property.isfreead = true;
          // }

          if (this.propCount == true) {
            this.property.status = "Deactive";
            this.property.isfreead = false;
          }
          // else if (this.propCount == false && this.isFreeAdd == false) {
          //   this.property.status = "Deactive";
          //   this.property.isfreead = false;
          // }
          else {
            this.property.status = "Active";
            if (this.roleid == 4) {
              this.property.isfreead = false;
              this.isFreeAdd = true;
            }
            else {
              this.property.isfreead = true;

            }
            // this.property.isfreead = true;
            this.isFreeAdd = true;
          }



          this.nearlukservice.PostProperty(this.property).subscribe((data) => {
            this.spinner.show();
            if (this.roleid == 4) {
              /* property paid */
              if (data.message === 'Property Added' && this.pCount > 0 && this.isFreeAdd == false) {

                this.propertyPayment(data.data[0].fn_addpropertydetails);
              }

              else if (data.message === 'Property Added' && this.pCount >= 0 && this.isFreeAdd == true) {

                this.router.navigate(['myproperty'])
                  .then(() => {
                    window.location.reload();
                  });

                this.spinner.hide();
                this.toastr.success('Successfully posted your property');
              }
              /* free post */
              else {
                this.router.navigate(['myproperty'])
                  .then(() => {
                    window.location.reload();
                  });
              }
              this.spinner.hide();
              this.toastr.success('Successfully posted your property');
            }
            else {
              /* property first time but paid */
              if (data.message === 'Property Added' && this.pCount == 0 && this.isFreeAdd == false) {

                this.propertyPayment(data.data[0].fn_addpropertydetails);

                /* property paid */
              } else if (data.message === 'Property Added' && this.pCount > 0) {

                this.propertyPayment(data.data[0].fn_addpropertydetails);

                /* free post */
              } else if (data.message === 'Property Added' && this.pCount == 0 && this.isFreeAdd == true) {

                this.router.navigate(['myproperty'])
                  .then(() => {
                    window.location.reload();
                  });

                this.spinner.hide();
                this.toastr.success('Successfully posted your property');
              } else {
                this.spinner.hide();
                this.toastr.error('Unable to post property please try again');
              }
            }
          });
        })
      } else {
        this.spinner.hide();
        swal({
          type: 'error',
          title: 'Oops...',
          text: "please login again",
          showCancelButton: false,
          confirmButtonColor: '#17a2b8',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.value) {
            this.spinner.hide();
            sessionStorage.clear();
            this.router.navigate(['login']);
          }
        });
        this.spinner.hide();
      }
    } else {
      this.showaddbutton = true;
      this.spinner.hide();
      this.toastr.error('please add cover image')
    }
  }

  /* ---------------------------------------------------------------------------------------------------------- */
  /* -------------------------------------- PROPERTY POSTING COUNT -------------------------------------------- */

  propertyPostingCount() {
    this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      if (data.length > 0) {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;
        this.nearlukservice.propertyPostingCount(this.userid).subscribe(data => {
          if (data.result === true) {
            this.propertyPostCount = data.data;
            // console.log(this.propertyPostCount[0].isfreead);
            this.pCount = this.propertyPostCount[0].count;
            if (this.roleid == 4) {
              this.propCount = false;

            }
            else {
              if (this.pCount > 0) {
                this.propCount = true;
              } else {
                this.propCount = false;
              }
            }
          }
        });
      }
    });
  }

  /* ----------------------------------------------------------------------------------------------------------- */
  /* -------------------------------------- PROPERTY PAYMENT --------------------------------------------------- */
  propertyPayment(posted_property_id) {
    this.spinner.show();
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
          this.spinner.show();
          this.nearlukservice.payment(this.userid, posted_property_id).subscribe(data => {
            this.spinner.show();
            if (data.result === true) {
              this.payData = data;
              this.priceData = data;
              this.categoryName = this.priceData.pricingData.categoryName;
              this.orderDays = this.priceData.pricingData.orderDays;
              this.orderExpireDate = this.priceData.pricingData.orderExpireDate;
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
              // this.cftoken(this.paymentpost.orderId, this.payData.data.orderAmount, this.payData.data.orderCurrency);
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
  /* ----------------------------------------------------------------------------------------------------------- */


  cftoken(orderId, orderAmount, orderCurrency): any {

    // console.log(orderId, orderAmount, orderCurrency);

    const reqData = {
      "orderId": orderId,
      "orderAmount": orderAmount,
      "orderCurrency": orderCurrency
    }

    this.nearlukservice.cftoken(reqData).subscribe(data => {

      // alert(JSON.stringify(data))

    });

  }

















  /*--------------------------------------------- LOCATION ----------------------------------------------------- */

  // handleAddressChange(address: Address) {
  //   this.property.latitude = address.geometry.location.lat();
  //   this.property.longitude = address.geometry.location.lng();
  //   this.lat = this.property.latitude
  //   this.lng = this.property.longitude
  //   let addr = JSON.stringify(address.formatted_address)
  //   let ad = JSON.parse(addr)
  //   let cntry = ad.split(/[\s,]+/)
  //   let country = cntry[cntry.length - 1];
  //   let geocoder = new google.maps.Geocoder();
  //   let latlngData = JSON.stringify(address.geometry.location)
  //   let latValue = JSON.parse(latlngData).lat;
  //   let lngValue = JSON.parse(latlngData).lng
  //   this.markers = [{ lat: latValue, lng: lngValue, label: 'A', draggable: true }]
  //   let latlng = { lat: this.lat, lng: this.lng };
  //   geocoder.geocode({ 'location': latlng }, (results, status) => {
  //     var indice = 0;
  //     for (var j = 0; j < results.length; j++) {
  //       if (results[j].types[0] == 'locality') {
  //         indice = j;
  //         break;
  //       }
  //     }
  //     for (var i = 0; i < results[j].address_components.length; i++) {
  //       if (results[j].address_components[i].types[0] == "locality") {
  //         let areaname = results[j].address_components[i];
  //         this.postmap.areaname = areaname.long_name;
  //       }
  //       if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
  //         let region = results[j].address_components[i];
  //         this.postmap.statename = region.long_name;
  //       }
  //       if (results[j].address_components[i].types[0] == "country") {
  //         let country = results[j].address_components[i];
  //         this.postmap.countryname = country.long_name;
  //       }
  //     }

  //     let add = results[0].formatted_address;
  //     let address = results[0].address_components;
  //     this.property.address = add;


  //     var str_array = add.split(',');
  //     str_array.reverse();
  //     var str = str_array[1];

  //     for (let index = 0; index < results.length; index++) {
  //       const element = results[index];
  //       if (element.place_id == 'ChIJx9Lr6tqZyzsRMyOXJZHL34s') {
  //         var city_array = element.formatted_address.split(',');
  //         this.postmap.cityname = city_array[0];
  //         break;
  //       } else {
  //         for (var i = 0; i < element.address_components.length; i++) {
  //           if (element.address_components[i].types[0] == "locality") {
  //             let cityname = element.address_components[i];
  //             this.postmap.cityname = cityname.long_name;
  //             break;
  //           } else {
  //             let cityname = results[5].formatted_address;
  //             var city_array = cityname.split(',');
  //             this.postmap.cityname = city_array[0];
  //           }
  //         }
  //       }
  //     }


  //     this.postmap.zipcode = str.replace(/[a-z,A-Z]/g, '');
  //     this.property.pincode = this.postmap.zipcode
  //     if (str_array.length.length == 3) {
  //       this.postmap.areaname = this.postmap.cityname
  //     }
  //     if (str_array.length.length == 2) {
  //       this.postmap.areaname = this.postmap.statename
  //       this.postmap.areaname = this.postmap.cityname
  //     }
  //     if (this.postmap.areaname == 'Unnamed Road' || this.postmap.areaname == undefined) {
  //       this.postmap.areaname = this.postmap.cityname
  //     }
  //     if (this.postmap.cityname == 'Unnamed Road' || this.postmap.cityname == undefined) {
  //       this.postmap.areaname = this.postmap.statename
  //       this.postmap.cityname = this.postmap.statename
  //     }
  //     this.toastr.info('Drag the marker to your location')
  //   });

  // }

  //Google Map Marker Dragging code
  // markerDragEnd(m: marker, $event: any) {
  //   let a = $event
  //   this.property.latitude = $event.coords.lat
  //   this.property.longitude = $event.coords.lng
  //   let geocoder = new google.maps.Geocoder();
  //   let latlng = { lat: this.property.latitude, lng: this.property.longitude };
  //   geocoder.geocode({ 'location': latlng }, (results, status) => {
  //     var indice = 0;
  //     for (var j = 0; j < results.length; j++) {
  //       if (results[j].types[0] == 'locality') {
  //         indice = j;
  //         break;
  //       }
  //     }
  //     for (var i = 0; i < results[j].address_components.length; i++) {
  //       if (results[j].address_components[i].types[0] == "locality") {
  //         let areaname = results[j].address_components[i];
  //         this.postmap.areaname = areaname.long_name;
  //       }
  //       if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
  //         let region = results[j].address_components[i];
  //         this.postmap.statename = region.long_name;
  //       }
  //       if (results[j].address_components[i].types[0] == "country") {
  //         let country = results[j].address_components[i];
  //         this.postmap.countryname = country.long_name;
  //       }
  //     }

  //     let add = results[0].formatted_address;
  //     let address = results[0].address_components;
  //     this.property.address = add;
  //     var str_array = add.split(',');
  //     str_array.reverse();
  //     var str = str_array[1];
  //     for (let index = 0; index < results.length; index++) {
  //       const element = results[index];
  //       if (element.place_id == 'ChIJx9Lr6tqZyzsRMyOXJZHL34s') {
  //         var city_array = element.formatted_address.split(',');
  //         this.postmap.cityname = city_array[0];
  //         break;
  //       } else {
  //         for (var i = 0; i < element.address_components.length; i++) {
  //           if (element.address_components[i].types[0] == "locality") {
  //             let cityname = element.address_components[i];
  //             this.postmap.cityname = cityname.long_name;
  //             break;
  //           } else {
  //             let cityname = results[5].formatted_address;
  //             var city_array = cityname.split(',');
  //             this.postmap.cityname = city_array[0];
  //           }
  //         }
  //       }
  //     }

  //     this.property.address = add;
  //     var str_array = add.split(',');
  //     str_array.reverse();
  //     var str = str_array[1];
  //     this.postmap.statename = str.replace(/[0-9]/g, '');
  //     this.postmap.zipcode = str.replace(/[a-z,A-Z]/g, '');
  //     this.property.pincode = this.postmap.zipcode
  //     if (str_array.length.length == 3) {
  //       this.postmap.areaname = this.postmap.cityname
  //     }
  //     if (str_array.length.length == 2) {
  //       this.postmap.areaname = this.postmap.statename
  //       this.postmap.areaname = this.postmap.cityname
  //     }
  //     if (this.postmap.areaname == 'Unnamed Road' || this.postmap.areaname == undefined) {
  //       this.postmap.areaname = this.postmap.cityname
  //     }

  //     if (this.postmap.cityname == 'Unnamed Road' || this.postmap.cityname == undefined) {
  //       this.postmap.areaname = this.postmap.statename
  //       this.postmap.cityname = this.postmap.statename
  //     }
  //   });
  // }

  handleAddressChange(address: Address) {


    this.property.latitude = address.geometry.location.lat();
    this.property.longitude = address.geometry.location.lng();


    this.lat = this.property.latitude
    this.lng = this.property.longitude
    let addr = JSON.stringify(address.formatted_address)

    let ad = JSON.parse(addr)
    let cntry = ad.split(/[\s,]+/)
    let country = cntry[cntry.length - 1];

    let geocoder = new google.maps.Geocoder();
    let latlngData = JSON.stringify(address.geometry.location)
    let latValue = JSON.parse(latlngData).lat;
    let lngValue = JSON.parse(latlngData).lng

    this.markers = [{ lat: latValue, lng: lngValue, label: 'A', draggable: true }]


    let latlng = { lat: this.lat, lng: this.lng };
    geocoder.geocode({ 'location': latlng }, (results, status) => {

      let add = results[0].formatted_address;


      var str_array = add.split(',');
      str_array.reverse();
      var str = str_array[1];
      this.postmap.statename = str.replace(/[0-9]/g, '');
      this.postmap.zipcode = str.replace(/[a-z,A-Z]/g, '');
      this.postmap.countryname = str_array[0];
      this.postmap.cityname = str_array[2];
      this.postmap.areaname = str_array[3];




      this.property.pincode = this.postmap.zipcode


      if (str_array.length.length == 3) {
        this.postmap.areaname = this.postmap.cityname
      }
      if (str_array.length.length == 2) {
        this.postmap.areaname = this.postmap.statename
        this.postmap.areaname = this.postmap.cityname
      }
      if (this.postmap.areaname == 'Unnamed Road' || this.postmap.areaname == undefined) {
        this.postmap.areaname = this.postmap.cityname
      }

      if (this.postmap.cityname == 'Unnamed Road' || this.postmap.cityname == undefined) {
        this.postmap.areaname = this.postmap.statename
        this.postmap.cityname = this.postmap.statename
      }

      this.toastr.info('Drag the marker to your location')
      // this.nearlukservice.getaddressidsusingname(this.postmap).subscribe((data) => {

      //   this.property.countryId = data[0].country_id
      //   this.property.stateId = data[0].state_id
      //   this.property.cityId = data[0].city_id
      //   this.property.areaId = data[0].area_id

      //   this.toastr.info('Drag the marker to your location')

      // })


    });

  }

  markerDragEnd(m: marker, $event: any) { //Google Map Marker Dragging code


    let a = $event
    this.property.latitude = $event.coords.lat
    this.property.longitude = $event.coords.lng


    // this.gservice.getLatLanofproperty(this.property.latitude, this.property.longitude)
    let geocoder = new google.maps.Geocoder();
    let latlng = { lat: this.property.latitude, lng: this.property.longitude };
    geocoder.geocode({ 'location': latlng }, (results, status) => {

      let add = results[0].formatted_address;


      var str_array = add.split(',');
      str_array.reverse();
      // console.log(str_array[2]);
      var str = str_array[1];
      // var result = str.split(" ");
      // var statename = result[1]
      // this.country = str_array[0];
      // this.state = statename;
      // this.city = str_array[2];
      // this.area = str_array[3];




      this.postmap.statename = str.replace(/[0-9]/g, '');

      this.postmap.zipcode = str.replace(/[a-z,A-Z]/g, '');

      this.postmap.countryname = str_array[0];
      this.postmap.cityname = str_array[2];
      this.postmap.areaname = str_array[3];



      this.property.pincode = this.postmap.zipcode
      if (str_array.length.length == 3) {
        this.postmap.areaname = this.postmap.cityname
      }
      if (str_array.length.length == 2) {
        this.postmap.areaname = this.postmap.statename
        this.postmap.areaname = this.postmap.cityname
      }
      if (this.postmap.areaname == 'Unnamed Road' || this.postmap.areaname == undefined) {
        this.postmap.areaname = this.postmap.cityname
      }

      if (this.postmap.cityname == 'Unnamed Road' || this.postmap.cityname == undefined) {
        this.postmap.areaname = this.postmap.statename
        this.postmap.cityname = this.postmap.statename
      }


      // this.nearlukservice.getaddressidsusingname(this.postmap).subscribe((data) => {


      //   this.property.countryId = data[0].country_id
      //   this.property.stateId = data[0].state_id
      //   this.property.cityId = data[0].city_id
      //   this.property.areaId = data[0].area_id


      // })


    });



  }



  /* --------------------------------------------------------------------------------------------------------- */
  /*--------------------------------------------- VIDEO UPLOAD ----------------------------------------------- */

  validateFile(event, file) {
    for (let index = 0; index < event.files.length; index++) {
      if (event.files[index].type == 'video/mp4') {
        this.isUploadEnable = true;
      } else {
        this.isUploadEnable = false;
        this.isUploadEnable = true;
        file.remove(event, index);
        this.toastr.error('Please upload .mp4 video only')
      }
    }
  }

  imagearray: any[] = [];
  onvideoUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      let fr = new FileReader()
      fr.readAsDataURL(this.uploadedFiles[0]);
      fr.onload = (evnt: any) => {
        this.propertyvideo = fr.result;
        var formatt = this.propertyvideo.split(';', 1);
        if (formatt == 'data:video/mp4') {
          this.displayvideo = true;
          this.propertyvideo = this.propertyvideo.replace("data:video/mp4;base64,", "")
          this.propertyvideo = this.propertyvideo.replace("data:image/jpeg;base64,", "")
          this.propertyvideo = this.propertyvideo.replace("data:video/x-ms-wmv;base64,", "")
          this.property.videos = this.propertyvideo;
        } else {
          this.uploadFiles.pop();
        }
      }
    }
  }
  /* --------------------------------------------------------------------------------------------------------- */








  bthchange(year: any, month: any) {
    if (year === '12+') {
      this.age == true;
      this.property.age = year
    } else {
      if (year === 'Years') {
        year = 0;
        var age = year + '.' + month
        this.property.age = age
      } else {
        var age = year + '.' + month
        this.property.age = age
      }
    }
  }



  btnhide(values) {
    var year = values.value
    if (values.value == '12+') {
      this.agemonth = true
      this.property.age = year
    } else {
      this.agemonth = false
    }
  }


  // storing facilities in an facilitiesarray
  checkBox(a: any) {
    this.facilitiesarray = this.facilitiesarray.concat(a)
    this.facilitiescount = 0
    for (let i = 0; i <= this.facilitiesarray.length; i++) {
      if (this.facilitiesarray[i] == a) {
        this.facilitiescount = this.facilitiescount + 1;
        if (this.facilitiescount == 2) {
          let index = this.facilitiesarray.indexOf(a)
          this.facilitiesarray.pop();
          this.facilitiesarray.splice(index, 1);
          this.facilitiescount = 0
        }
      }
    }
  }

  // Storing Aminities in an Array
  amenity(id: number, a) {
    let amObj: Aminity;
    amObj = new Aminity();
    amObj.id = id;
    amObj.amName = a.value;
    this.amArray.push(amObj)
    this.count = 0
    this.amArray.forEach(element => {
      if (element.id == id) {
        this.count = this.count + 1;
        if (this.count == 2) {
          this.amArray.forEach(element2 => {
            if (element2.id == id) {
              let index = this.amArray.indexOf(element2)
              this.amArray.splice(index, 1);
            }
          })
          this.amArray.push(amObj)
          this.count = 0;
        }
      }
    });
  }

  getAmentiesfacilities(propertytypeid) {
    this.amenitiesGet = [];
    this.nearlukservice.getAmenties(propertytypeid.value).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      } else {
        if (data.data == "NDF") {
          var res = data.message
        } else {
          this.amenitiesGet = data.data;
        }
      }
    });

    this.facilitiesGet = [];
    this.nearlukservice.getFacilities(propertytypeid.value).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      } else {
        if (data.data == "NDF") {
          var res = data.message
        } else {
          data.data.forEach(element => {
            let obj: any = { "fid": element.id, "fname": element.facilityname, "fimg": this.imgApi + "/" + element.facilityname + '.png' }
            this.facilitiesGet.push(obj);
          });
        }
      }
    })
  }


  /* IMAGE UPLOAD */
  imageFile(event, file, type) {
    this.isUploadEnable = true;
    this.showaddbutton = false;
    for (let index = 0; index < event.files.length; index++) {
      if (event.files[index].type == '.png||.jpg||.jpeg') {
        this.isUploadEnable = true;
        this.showaddbutton = false;
      } else {
        this.isUploadEnable = false;
        this.isUploadEnable = true;
        this.showaddbutton = true;
        file.remove(event, index);
      }
    }
  }
  upload(event) {
    this.eventCoverImage = event;
    this.coverimage = true;
  }
  onUpload1(event) {
    this.event = event
  }
  onUpload2(event) {
    this.event2 = event
  }
  onUpload3(event) {
    this.event3 = event
  }
  onUpload4(event) {
    this.event4 = event
  }
  onUpload5(event) {
    this.event5 = event
  }
  onUpload6(event) {
    this.event6 = event
  }
  onUpload7(event) {
    this.event7 = event
  }
  onUpload8(event) {
    this.event8 = event
  }
  onUpload9(event) {
    this.event9 = event
  }



  dateValidation() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let nextMonth = (month === 11) ? 0 : month + 2;
    let nextYear = (nextMonth === 0) ? year : year;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);
  }

  sessionStorage() {
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
        } else {
          localStorage.removeItem('user');
          sessionStorage.removeItem('user')
          this.router.navigate(['login']);
        }
      });
    } else {
      localStorage.removeItem('user');
      sessionStorage.removeItem('user')
      this.router.navigate(['login']);
    }
  }

  /* ----------------------------------------- IMAGE COMPRESS --------------------------------------------- */

  uploadImage(typeValue) {
    let images: Array<IImage> = [];
    if (typeValue.files.length > 0) {
      ImageCompressService.filesToCompressedImageSource(typeValue.files).then(observableImages => {
        observableImages.subscribe((image) => {
          images.push(image);
        }, (error) => { console.log("Error while converting"); },
          () => {
            // console.log("E converting");
            this.processedImages = images;
            for (var i = 0; i < this.processedImages.length; i++) {
              this.property.image = this.processedImages[i].compressedImage.imageDataUrl
              var formatt = this.property.image.split(';', 1);
              if (formatt == 'data:image/png;base64' || 'data:image/gif;base64' || 'data:image/jpeg;base64' || 'data:image/jpg;base64') {
                this.property.image = this.property.image.replace('data:image/gif;base64,', '')
                this.property.image = this.property.image.replace('data:image/jpeg;base64,', '')
                this.property.image = this.property.image.replace('data:image/jpg;base64,', '')
                this.property.image = this.property.image.replace('data:image/ico;base64,', '')
                this.property.image = this.property.image.replace('data:image/svg;base64,', '')
                this.property.image = this.property.image.replace('data:image/png;base64,', '')
                this.imagearray.push(this.property.image)
              } else {
                this.uploadedFiles.pop();
                this.toastr.error('please send only png')
              }
            }
            this.showTitle = true;
          });
      });
    } else {
      this.toastr.error('Upload Pics')
    }
  }

  /* ----------------------------------------------------------------------------------------------------------- */
  /*--------------------------------------------- DROP DOWNS --------------------------------------------------- */

  getCoutries() {
    this.nearlukservice.getcountries().subscribe((data) => {
      this.options = data.data
    });
  }
  getStates(country) {
    this.nearlukservice.getStates(country.value).subscribe((data) => {
      this.states = data.data
    })
  }
  getCities(state) {
    this.nearlukservice.getCities(state.value).subscribe((data) => {
      this.cities = data.data
    })
  }
  getAreas(city) {
    this.nearlukservice.getArea(city.value).subscribe((data) => {
      if (data.data != 'NDF') {
        this.area = data.data
      }
    })
  }

  changepropertytypes(propertyCategoryId) {
    this.optionPropertyType = null;
    this.property.propertyTypeId = null;
    this.property.preference = null;
    this.nearlukservice.GetPropertyTypeByPropertyCategory(propertyCategoryId.value).subscribe((data) => {
      if (data.result == true) {
        this.optionPropertyType = data.data
      }
    });
  }

  changepreference(propertyTypeId) {
    this.preferences = null;
    this.property.preference = null;
    this.nearlukservice.GetFeaturesByPropertyType(propertyTypeId.value).subscribe((data) => {
      if (data.result == true) {
        this.preferences = data.data;
      }
    });
  }

  // getPropertyType() {
  //   this.nearlukservice.getPropertyType().subscribe((data) => {
  //     if (data.result == false) {
  //       var res = data.message
  //     } else {
  //       if (data.data == "NDF") {
  //         var res = data.message
  //       } else {
  //         this.optionPropertyType = data.data;
  //       }
  //     }
  //   });
  // }

  optionPropertyCategory: any;
  getPropertyCategory() {
    this.nearlukservice.getPropertyCategory().subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      } else {
        if (data.data == "NDF") {
          var res = data.message
        } else {
          this.optionPropertyCategory = data.data;
        }
      }
    });
  }



  getBhkTypes() {
    this.nearlukservice.getBhkTypes().subscribe((data) => {
      this.bhktype = data.data
    });
  }

  getBuildingTypes() {
    this.nearlukservice.getBuildingTypes().subscribe((data) => {
      this.buildtype = data.data
    });
  }

  getFurnishedType() {
    this.nearlukservice.getFurnishedType().subscribe((data) => {
      this.furnishedtype = data.data
    });
  }

  getFloorType() {
    this.nearlukservice.getFloorType().subscribe((data) => {
      this.floortype = data.data
    });
  }

  getNoiseLevel() {
    this.nearlukservice.getNoiseLevel().subscribe((data) => {
      this.noise = data.data
    });
  }

  getFeatures() {
    this.nearlukservice.getFeatures().subscribe((data) => {
      this.features = data.data;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'featurename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };

    });
  }

  getResidenceFurnishings() {
    this.nearlukservice.getResidenceFurnishings().subscribe((data) => {
      this.rsfurnishing = data.data;
      this.furnishingsdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'residencefurnishingname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getCommonFurnishings() {
    this.nearlukservice.getCommonFurnishings().subscribe((data) => {
      this.cmfurnishing = data.data;
      this.commanfurnishingsdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'commonfurnishingname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getShareTypes() {
    this.nearlukservice.getShareTypes().subscribe((data) => {
      this.sharetype = data.data;
      this.sharetypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'sharetypename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getFoodType() {
    this.nearlukservice.getFoodType().subscribe((data) => {
      this.foodtype = data.data;
      this.foodtypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'foodtypename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getAlcoholType() {
    this.nearlukservice.getAlcoholType().subscribe((data) => {
      this.alcoholtype = data.data;
      this.alcoholtypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'alcohol',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getFoodprovisionType() {
    this.nearlukservice.getFoodprovisionType().subscribe((data) => {
      this.foodprovisiontype = data.data;
      this.foodprovisiontypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'foodprovisiontype',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getDecorationprovisionType() {
    this.nearlukservice.getDecorationprovisionType().subscribe((data) => {
      this.decorationtype = data.data;
      this.decorationtypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'decorationprovisiontype',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getOtherpoliciesType() {
    this.nearlukservice.getOtherpoliciesType().subscribe((data) => {
      this.otherpolicietype = data.data;
      this.otherpolicietypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'otherpolicytype',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getEventTypes() {
    this.nearlukservice.getEventTypes().subscribe((data) => {
      this.eventtype = data.data;
      this.eventtypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'eventtypename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getHallTypes() {
    this.nearlukservice.getHallTypes().subscribe((data) => {
      this.halltype = data.data;
      this.halltypedropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'halltypename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getHosteltermsandpolicies() {
    this.nearlukservice.getHosteltermsandpolicies().subscribe((data) => {
      this.hostelterms = data.data;
      this.hosteltermsdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'hosteltermsandpolicy',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }


  getPlaygroundtermsandpolicies() {
    this.nearlukservice.getPlaygroundtermsandpolicies().subscribe((data) => {
      this.playgroundterms = data.data;
      this.playgroundtermsdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'playgroundtermsandpolicy',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }


  getEventFeaturesofvenue() {
    this.nearlukservice.getEventFeaturesofvenue().subscribe((data) => {
      this.eventfeatures = data.data;
      this.eventfeaturesdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'eventfeaturesofvenuename',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }


  getHostelac() {
    this.nearlukservice.getHostelac().subscribe((data) => {
      this.hostelac = data.data;
      this.hostelacdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'hostelacname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getHostelnonac() {
    this.nearlukservice.getHostelnonac().subscribe((data) => {
      this.hostelnonac = data.data;
      this.hostelnonacdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'hostelnonacname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getPlaygroundfeatures() {
    this.nearlukservice.getPlaygroundfeatures().subscribe((data) => {
      this.playgroundfeatures = data.data;
      this.playgroundfeaturesdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'playgroundfeaturesname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getVehiclefeatures() {
    this.nearlukservice.getVehiclefeatures().subscribe((data) => {
      this.vehiclefeatures = data.data;
      this.vehiclefeaturesdropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'vehiclefeaturesname',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 2,
        allowSearchFilter: false,
        enableCheckAll: true
      };
    });
  }

  getPropertyshownby() {
    this.nearlukservice.getPropertyshownby().subscribe((data) => {
      this.propertyshowby = data.data
    });
  }

  getSmoking() {
    this.nearlukservice.getSmoking().subscribe((data) => {
      this.smoking = data.data
    });
  }

  getDrinking() {
    this.nearlukservice.getDrinking().subscribe((data) => {
      this.drinking = data.data
    });
  }

  getPropertyrent() {
    this.nearlukservice.getPropertyrent().subscribe((data) => {
      this.propertyrent = data.data
    });
  }

  getPropertysecuritydeposit() {
    this.nearlukservice.getPropertysecuritydeposit().subscribe((data) => {
      this.securitydeposit = data.data
    });
  }

  /* --------------------------------------------------------------------------------------------------------- */

}
