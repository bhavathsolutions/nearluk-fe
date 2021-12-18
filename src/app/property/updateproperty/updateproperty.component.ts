import { editing } from './../../model/property';
import { Component, OnInit } from '@angular/core';
import { property } from 'src/app/model/property';
import { NearlukService } from '../../services/nearluk.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


class Aminity {
  id: number;
  amName: string;

}
@Component({
  selector: 'app-updateproperty',
  templateUrl: './updateproperty.component.html',
  styleUrls: ['./updateproperty.component.css']
})
export class UpdatepropertyComponent implements OnInit {
  imgApi = environment.api;

  propertyDetailsforUpdate: property;
  propertyId: any;
  property: any;
  rentalPeriod: any;
  propertylocation: property;
  optionPropertyType: any;
  facilitiesGet: any;
  amenitiesGet: any;
  propertyTypeid: any;
  array: any = [];
  count: any;
  amenar: any[] = [];
  facilitiesGetUserSelected: any;
  facilitiesGetUsernotSelected: any;
  fileUpload: any;
  optionsdimensionsunits: any;
  optionCurrency: any;
  imagesdisplay: boolean;
  facilitiesArray: any[] = [];
  facilitiesGet3: any[] = [];
  amenitiesArray: any[] = [];

  amenitiesArrayGet: any[] = [];
  amenitiesUserNotSelected: any;
  amArray: any[] = [];
  // editimg: editimg;
  // img: images;
  uploadFiles: any[] = [];
  dispalayimages: any[];
  username: string;
  displayimages: any[];
  userid: any;
  roleid: any;
  isUploadEnable: boolean;

  imagearray: any[] = [];

  editing: editing;

  preferences: any = [];
  age: any;
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
  securitydeposit1: any;
  propertyCategoryId: any;

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





  constructor(private service: NearlukService, private acr: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.property = new property();
    this.propertyDetailsforUpdate = new property();
    this.propertylocation = new property();
    this.editing = new editing();

    // this.editimg = new editimg();
    // this.img = new images();
  }
  checkBox(a: any) {

    this.array = this.array.concat(a)

    this.count = 0
    for (let i = 0; i <= this.array.length; i++) {

      if (this.array[i] == a) {


        this.count = this.count + 1;

        if (this.count == 2) {
          let index = this.array.indexOf(a)
          this.array.pop();
          this.array.splice(index, 1);
          this.count = 0
        }
      }
    }

  }




  onDelete(a: any) {
    var a1 = (a.split("/"))
    a1 = a1.reverse();
    this.editing.path = a1[0]
    this.editing.image = a

    swal({
      title: 'Are you agree to DELETE!',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Agree'
    }).then((result) => {
      if (result.value) {

        this.service.deleteImages(a1[0], this.propertyId).subscribe((data) => {
          // console.log(data)
          if (data) {
            for (let i = 1; i < this.displayimages.length; i++) {
              if (this.displayimages[i].source == a) {
                this.displayimages.splice(i, 1);
                if (this.displayimages.length == 1) {
                  this.imagesdisplay = true
                }
              }
            }
          }
        })

      }
    })
  }



  amenity(id: number, a) {

    let amObj: Aminity;
    amObj = new Aminity();
    amObj.id = id;
    amObj.amName = a;

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
    //alert(JSON.stringify(this.amArray))
  }

  updatePropertyDetails() {
    debugger
    this.property.image = this.imagearray;
    this.propertyDetailsforUpdate.image = this.imagearray;
    this.propertyDetailsforUpdate.propertyId = this.propertyId
    this.service.deleteFacilitiesAndAmnities(this.propertyId).subscribe((data) => {
      if (this.amArray != null) {
        for (var i = 0; i < this.amArray.length; i++) {
          this.service.addAmenities(this.propertyId, this.amArray[i].id, this.amArray[i].amName).subscribe((data) => {
          });
        }
      }
      if (this.array.length != null) {
        for (var i = 0; i < this.array.length; i++) {
          // alert("faciliotioes" + JSON.stringify(this.array[i]))
          this.service.addFacilities(this.array[i], this.propertyId).subscribe((data) => {
          });
        }
      }
    })

    if (this.propertyDetailsforUpdate.features) {
      for (var a = 0; a < this.propertyDetailsforUpdate.features.length; a++) {
        this.featuresArray.push(parseInt(this.propertyDetailsforUpdate.features[a].id));
      }
    };
 
    if (this.propertyDetailsforUpdate.residencefurnishings) {
      for (var b = 0; b < this.propertyDetailsforUpdate.residencefurnishings.length; b++) {
        this.furnishingsArray.push(parseInt(this.propertyDetailsforUpdate.residencefurnishings[b].id));
      }
    };

    if (this.propertyDetailsforUpdate.commonfurnishings) {
      for (var c = 0; c < this.propertyDetailsforUpdate.commonfurnishings.length; c++) {
        this.commonfurnishingsArray.push(parseInt(this.propertyDetailsforUpdate.commonfurnishings[c].id));
      }
    };

    if (this.propertyDetailsforUpdate.sharetype) {
      for (var d = 0; d < this.propertyDetailsforUpdate.sharetype.length; d++) {
        this.sharetypeArray.push(parseInt(this.propertyDetailsforUpdate.sharetype[d].id));
      }
    };

    if (this.propertyDetailsforUpdate.foodtype) {
      for (var e = 0; e < this.propertyDetailsforUpdate.foodtype.length; e++) {
        this.foodtypeArray.push(parseInt(this.propertyDetailsforUpdate.foodtype[e].id));
      }
    };

    if (this.propertyDetailsforUpdate.alcoholprovision) {
      for (var f = 0; f < this.propertyDetailsforUpdate.alcoholprovision.length; f++) {
        this.alcoholprovisionArray.push(parseInt(this.propertyDetailsforUpdate.alcoholprovision[f].id));
      }
    };

    if (this.propertyDetailsforUpdate.foodprovision) {
      for (var g = 0; g < this.propertyDetailsforUpdate.foodprovision.length; g++) {
        this.foodprovisionArray.push(parseInt(this.propertyDetailsforUpdate.foodprovision[g].id));
      }
    };

    if (this.propertyDetailsforUpdate.decorationprovision) {
      for (var h = 0; h < this.propertyDetailsforUpdate.decorationprovision.length; h++) {
        this.decorationprovisionArray.push(parseInt(this.propertyDetailsforUpdate.decorationprovision[h].id));
      }
    };

    if (this.propertyDetailsforUpdate.otherpolicies) {
      for (var i = 0; i < this.propertyDetailsforUpdate.otherpolicies.length; i++) {
        this.otherpoliciesArray.push(parseInt(this.propertyDetailsforUpdate.otherpolicies[i].id));
      }
    };

    if (this.propertyDetailsforUpdate.eventtype) {
      for (var j = 0; j < this.propertyDetailsforUpdate.eventtype.length; j++) {
        this.eventtypeArray.push(parseInt(this.propertyDetailsforUpdate.eventtype[j].id));
      }
    };

    if (this.propertyDetailsforUpdate.halltype) {
      for (var k = 0; k < this.propertyDetailsforUpdate.halltype.length; k++) {
        this.halltypeArray.push(parseInt(this.propertyDetailsforUpdate.halltype[k].id));
      }
    };

    if (this.propertyDetailsforUpdate.hosteltermsandpolicy) {
      for (var l = 0; l < this.propertyDetailsforUpdate.hosteltermsandpolicy.length; l++) {
        this.hosteltermsandpolicyArray.push(parseInt(this.propertyDetailsforUpdate.hosteltermsandpolicy[l].id));
      }
    };

    if (this.propertyDetailsforUpdate.playgroundtermsandpolicy) {
      for (var m = 0; m < this.propertyDetailsforUpdate.playgroundtermsandpolicy.length; m++) {
        this.playgroundtermsandpolicyArray.push(parseInt(this.propertyDetailsforUpdate.playgroundtermsandpolicy[m].id));
      }
    };

    if (this.propertyDetailsforUpdate.eventfeaturesofvenue) {
      for (var n = 0; n < this.propertyDetailsforUpdate.eventfeaturesofvenue.length; n++) {
        this.eventfeaturesofvenueArray.push(parseInt(this.propertyDetailsforUpdate.eventfeaturesofvenue[n].id));
      }
    };

    if (this.propertyDetailsforUpdate.hostelac) {
      for (var o = 0; o < this.propertyDetailsforUpdate.hostelac.length; o++) {
        this.hostelacArray.push(parseInt(this.propertyDetailsforUpdate.hostelac[o].id));
      }
    };

    if (this.propertyDetailsforUpdate.hostelnonac) {
      for (var p = 0; p < this.propertyDetailsforUpdate.hostelnonac.length; p++) {
        this.hostelnonacArray.push(parseInt(this.propertyDetailsforUpdate.hostelnonac[p].id));
      }
    };

    if (this.propertyDetailsforUpdate.playgroundfeatures) {
      for (var q = 0; q < this.propertyDetailsforUpdate.playgroundfeatures.length; q++) {
        this.playgroundfeaturesArray.push(parseInt(this.propertyDetailsforUpdate.playgroundfeatures[q].id));
      }
    };

    if (this.propertyDetailsforUpdate.vehiclefeatures) {
      for (var r = 0; r < this.propertyDetailsforUpdate.vehiclefeatures.length; r++) {
        this.vehiclefeaturesArray.push(parseInt(this.propertyDetailsforUpdate.vehiclefeatures[r].id));
      }
    };

    // alert(JSON.stringify(this.propertyDetailsforUpdate.eventtype.length))
    if (this.propertyDetailsforUpdate.booking_date) {
      this.propertyDetailsforUpdate.booking_date = '' + this.propertyDetailsforUpdate.booking_date;
      this.booking_date_arr = this.propertyDetailsforUpdate.booking_date.split(',');
      this.propertyDetailsforUpdate.booking_date = this.booking_date_arr;
    }


    this.propertyDetailsforUpdate.features = this.featuresArray;
    this.propertyDetailsforUpdate.residencefurnishings = this.furnishingsArray;
    this.propertyDetailsforUpdate.commonfurnishings = this.commonfurnishingsArray;
    this.propertyDetailsforUpdate.sharetype = this.sharetypeArray;
    this.propertyDetailsforUpdate.foodtype = this.foodtypeArray;
    this.propertyDetailsforUpdate.alcoholprovision = this.alcoholprovisionArray;
    this.propertyDetailsforUpdate.foodprovision = this.foodprovisionArray;
    this.propertyDetailsforUpdate.decorationprovision = this.decorationprovisionArray;
    this.propertyDetailsforUpdate.otherpolicies = this.otherpoliciesArray;
    this.propertyDetailsforUpdate.eventtype = this.eventtypeArray;
    this.propertyDetailsforUpdate.halltype = this.halltypeArray;
    this.propertyDetailsforUpdate.hosteltermsandpolicy = this.hosteltermsandpolicyArray;
    this.propertyDetailsforUpdate.playgroundtermsandpolicy = this.playgroundtermsandpolicyArray;
    this.propertyDetailsforUpdate.eventfeaturesofvenue = this.eventfeaturesofvenueArray;
    this.propertyDetailsforUpdate.hostelac = this.hostelacArray;
    this.propertyDetailsforUpdate.hostelnonac = this.hostelnonacArray;
    this.propertyDetailsforUpdate.playgroundfeatures = this.playgroundfeaturesArray;
    this.propertyDetailsforUpdate.vehiclefeatures = this.vehiclefeaturesArray;


    this.service.updateProperty(this.propertyDetailsforUpdate).subscribe((data) => {
      debugger
      this.toastr.success('You have successfully updated your property details')
      this.router.navigate(['myproperty']);
    });
  }

  // onUpload(event) {
  //   for (let file of event.files) {
  //     this.uploadFiles.push(file);
  //   }
  //   for (let i = 0; i < this.uploadFiles.length; i++) {
  //     this.property.image = this.uploadFiles[i];
  //     var reader = new FileReader();
  //     reader.readAsDataURL(this.uploadFiles[i]);
  //     reader.onload = (ev: any) => {
  //       this.property.image = ev.target.result;
  //       this.property.image = this.property.image.replace('data:image/gif;base64,', '')
  //       this.property.image = this.property.image.replace('data:image/jpeg;base64,', '')
  //       this.property.image = this.property.image.replace('data:image/png;base64,', '')
  //       this.imagearray.push(this.property.image);
  //     }
  //   }
  // }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadFiles.push(file);
      this.isUploadEnable = false;
    }
    for (let i = 0; i < this.uploadFiles.length; i++) {
      this.isUploadEnable = false;

      this.property.image = this.uploadFiles[i];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadFiles[i]);
      reader.onload = (ev: any) => {
        this.property.image = ev.target.result;
        this.property.image = this.property.image.replace('data:image/gif;base64,', '')
        this.property.image = this.property.image.replace('data:image/jpeg;base64,', '')
        this.property.image = this.property.image.replace('data:image/png;base64,', '')
        this.imagearray.push(this.property.image);
        this.toastr.success('Images are uploaded')
      }
    }
  }

  imageFile(event, file) {

    for (let index = 0; index < event.files.length; index++) {


      if (event.files[index].type == '.png||.jpg||.jpeg') {

        this.isUploadEnable = true;

      }
      else {
        this.isUploadEnable = false;
        this.isUploadEnable = true;
        file.remove(event, index);
      }
    }

  }






  ngOnInit() {
    this.propertyId = this.acr.snapshot.params.id;
    this.propertyCategoryId = this.acr.snapshot.params.propertycategoryid;
    // alert(this.propertyId)

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



    if (sessionStorage.getItem('user') != null) {
      this.service.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {


        if (data.length > 0) {
          this.userid = data[0].userid;
          this.roleid = data[0].roleid;
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
    this.service.getPropertyDetailsForUpdate(this.propertyId).subscribe((data) => {
      console.log(data)
      this.service.GetImages(this.propertyId).subscribe((data) => {

        if (data.length > 1) {
          this.imagesdisplay = false
        }
        this.displayimages = []
        data.forEach(file => {
          this.displayimages.push({ source: file, alt: 'Description for Image 1', title: '' })
        });
      })

      this.propertyCategoryId = data.data[0].propertycategoryid;
      // alert(this.propertyCategoryId)

      // if (this.propertyDetailsforUpdate.features) {
      //   for (var a = 0; a < this.propertyDetailsforUpdate.features.length; a++) {
      //     this.featuresArray.push(parseInt(this.propertyDetailsforUpdate.features[a].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.residencefurnishings) {
      //   for (var b = 0; b < this.propertyDetailsforUpdate.residencefurnishings.length; b++) {
      //     this.furnishingsArray.push(parseInt(this.propertyDetailsforUpdate.residencefurnishings[b].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.commonfurnishings) {
      //   for (var c = 0; c < this.propertyDetailsforUpdate.commonfurnishings.length; c++) {
      //     this.commonfurnishingsArray.push(parseInt(this.propertyDetailsforUpdate.commonfurnishings[c].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.sharetype) {
      //   for (var d = 0; d < this.propertyDetailsforUpdate.sharetype.length; d++) {
      //     this.sharetypeArray.push(parseInt(this.propertyDetailsforUpdate.sharetype[d].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.foodtype) {
      //   for (var e = 0; e < this.propertyDetailsforUpdate.foodtype.length; e++) {
      //     this.foodtypeArray.push(parseInt(this.propertyDetailsforUpdate.foodtype[e].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.alcoholprovision) {
      //   for (var f = 0; f < this.propertyDetailsforUpdate.alcoholprovision.length; f++) {
      //     this.alcoholprovisionArray.push(parseInt(this.propertyDetailsforUpdate.alcoholprovision[f].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.foodprovision) {
      //   for (var g = 0; g < this.propertyDetailsforUpdate.foodprovision.length; g++) {
      //     this.foodprovisionArray.push(parseInt(this.propertyDetailsforUpdate.foodprovision[g].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.decorationprovision) {
      //   for (var h = 0; h < this.propertyDetailsforUpdate.decorationprovision.length; h++) {
      //     this.decorationprovisionArray.push(parseInt(this.propertyDetailsforUpdate.decorationprovision[h].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.otherpolicies) {
      //   for (var i = 0; i < this.propertyDetailsforUpdate.otherpolicies.length; i++) {
      //     this.otherpoliciesArray.push(parseInt(this.propertyDetailsforUpdate.otherpolicies[i].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.eventtype) {
      //   for (var j = 0; j < this.propertyDetailsforUpdate.eventtype.length; j++) {
      //     this.eventtypeArray.push(parseInt(this.propertyDetailsforUpdate.eventtype[j].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.halltype) {
      //   for (var k = 0; k < this.propertyDetailsforUpdate.halltype.length; k++) {
      //     this.halltypeArray.push(parseInt(this.propertyDetailsforUpdate.halltype[k].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.hosteltermsandpolicy) {
      //   for (var l = 0; l < this.propertyDetailsforUpdate.hosteltermsandpolicy.length; l++) {
      //     this.hosteltermsandpolicyArray.push(parseInt(this.propertyDetailsforUpdate.hosteltermsandpolicy[l].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.playgroundtermsandpolicy) {
      //   for (var m = 0; m < this.propertyDetailsforUpdate.playgroundtermsandpolicy.length; m++) {
      //     this.playgroundtermsandpolicyArray.push(parseInt(this.propertyDetailsforUpdate.playgroundtermsandpolicy[m].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.eventfeaturesofvenue) {
      //   for (var n = 0; n < this.propertyDetailsforUpdate.eventfeaturesofvenue.length; n++) {
      //     this.eventfeaturesofvenueArray.push(parseInt(this.propertyDetailsforUpdate.eventfeaturesofvenue[n].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.hostelac) {
      //   for (var o = 0; o < this.propertyDetailsforUpdate.hostelac.length; o++) {
      //     this.hostelacArray.push(parseInt(this.propertyDetailsforUpdate.hostelac[o].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.hostelnonac) {
      //   for (var p = 0; p < this.propertyDetailsforUpdate.hostelnonac.length; p++) {
      //     this.hostelnonacArray.push(parseInt(this.propertyDetailsforUpdate.hostelnonac[p].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.playgroundfeatures) {
      //   for (var q = 0; q < this.propertyDetailsforUpdate.playgroundfeatures.length; q++) {
      //     this.playgroundfeaturesArray.push(parseInt(this.propertyDetailsforUpdate.playgroundfeatures[q].id));
      //   }
      // };

      // if (this.propertyDetailsforUpdate.vehiclefeatures) {
      //   for (var r = 0; r < this.propertyDetailsforUpdate.vehiclefeatures.length; r++) {
      //     this.vehiclefeaturesArray.push(parseInt(this.propertyDetailsforUpdate.vehiclefeatures[r].id));
      //   }
      // };

      // alert(JSON.stringify(this.propertyDetailsforUpdate.eventtype.length))
      // if (this.propertyDetailsforUpdate.booking_date) {
      //   this.propertyDetailsforUpdate.booking_date = '' + this.propertyDetailsforUpdate.booking_date;
      //   this.booking_date_arr = this.propertyDetailsforUpdate.booking_date.split(',');
      //   this.propertyDetailsforUpdate.booking_date = this.booking_date_arr;
      // }


      // this.propertyDetailsforUpdate.features = this.featuresArray;
      // this.propertyDetailsforUpdate.residencefurnishings = this.furnishingsArray;
      // this.propertyDetailsforUpdate.commonfurnishings = this.commonfurnishingsArray;
      // this.propertyDetailsforUpdate.sharetype = this.sharetypeArray;
      // this.propertyDetailsforUpdate.foodtype = this.foodtypeArray;
      // this.propertyDetailsforUpdate.alcoholprovision = this.alcoholprovisionArray;
      // this.propertyDetailsforUpdate.foodprovision = this.foodprovisionArray;
      // this.propertyDetailsforUpdate.decorationprovision = this.decorationprovisionArray;
      // this.propertyDetailsforUpdate.otherpolicies = this.otherpoliciesArray;
      // this.propertyDetailsforUpdate.eventtype = this.eventtypeArray;
      // this.propertyDetailsforUpdate.halltype = this.halltypeArray;
      // this.propertyDetailsforUpdate.hosteltermsandpolicy = this.hosteltermsandpolicyArray;
      // this.propertyDetailsforUpdate.playgroundtermsandpolicy = this.playgroundtermsandpolicyArray;
      // this.propertyDetailsforUpdate.eventfeaturesofvenue = this.eventfeaturesofvenueArray;
      // this.propertyDetailsforUpdate.hostelac = this.hostelacArray;
      // this.propertyDetailsforUpdate.hostelnonac = this.hostelnonacArray;
      // this.propertyDetailsforUpdate.playgroundfeatures = this.playgroundfeaturesArray;
      // this.propertyDetailsforUpdate.vehiclefeatures = this.vehiclefeaturesArray;


      this.property = data.data[0]
      //alert(JSON.stringify(this.property))
      this.propertyDetailsforUpdate.propertyName = data.data[0].propertyname;
      this.propertyDetailsforUpdate.price = data.data[0].price;
      this.propertyDetailsforUpdate.description = data.data[0].description;
      this.propertyDetailsforUpdate.propertyArea = data.data[0].propertyarea;
      this.propertyDetailsforUpdate.landmarks = data.data[0].landmarks;
      this.propertyDetailsforUpdate.constructionStatus = data.data[0].constructionstatus;
      this.propertyDetailsforUpdate.securityDeposit = data.data[0].securitydeposit;
      this.propertyDetailsforUpdate.maintainanceCost = data.data[0].maintainancecost;
      this.propertyDetailsforUpdate.rentalPeriod = data.data[0].rentalperiod;
      this.propertyDetailsforUpdate.facing = data.data[0].facing;
      this.propertyDetailsforUpdate.available = data.data[0].available;
      
      this.propertyDetailsforUpdate.age = data.data[0].age;
      this.propertyDetailsforUpdate.preference = data.data[0].preference;
      this.propertyDetailsforUpdate.ownername = data.data[0].ownername;
      this.propertyDetailsforUpdate.ownermobile = data.data[0].ownermobile;
      this.propertyDetailsforUpdate.ownermobile1 = data.data[0].ownermobile1;
      this.propertyDetailsforUpdate.agentreferralid = data.data[0].agentreferralid;
      this.propertyDetailsforUpdate.bhktype = data.data[0].bhktype;
      this.propertyDetailsforUpdate.buildtype = data.data[0].buildtype;
      this.propertyDetailsforUpdate.vacantnoticeperiod = data.data[0].vacantnoticeperiod;
      this.propertyDetailsforUpdate.propertyvisittime = data.data[0].propertyvisittime;
      this.propertyDetailsforUpdate.nooffloorsinbuilding = data.data[0].nooffloorsinbuilding;
      this.propertyDetailsforUpdate.propertyinfloorno = data.data[0].propertyinfloorno;
      this.propertyDetailsforUpdate.floortype = data.data[0].floortype;
      this.propertyDetailsforUpdate.bedrooms = data.data[0].bedrooms;
      this.propertyDetailsforUpdate.restrooms = data.data[0].restrooms;
      this.propertyDetailsforUpdate.noiselevel = data.data[0].noiselevel;
      this.propertyDetailsforUpdate.features = data.data[0].featurename;
      this.propertyDetailsforUpdate.residencefurnishings = data.data[0].residencefurnishingname;
      this.propertyDetailsforUpdate.furnishedtype = data.data[0].furnishedtype;
      this.propertyDetailsforUpdate.commonfurnishings = data.data[0].commonfurnishingname;
      this.propertyDetailsforUpdate.sharetype = data.data[0].sharetypename;
      this.propertyDetailsforUpdate.totalnoofrooms = data.data[0].totalnoofrooms;
      this.propertyDetailsforUpdate.totalnoofbeds = data.data[0].totalnoofbeds;
      this.propertyDetailsforUpdate.availablebeds = data.data[0].availablebeds;
      this.propertyDetailsforUpdate.advanceamount = data.data[0].advanceamount;
      this.propertyDetailsforUpdate.noticeperiod = data.data[0].noticeperiod;
      this.propertyDetailsforUpdate.foodtype = data.data[0].foodtypename;
      this.propertyDetailsforUpdate.eventtype = data.data[0].eventtypename;
      this.propertyDetailsforUpdate.halltype = data.data[0].halltypename;
      this.propertyDetailsforUpdate.booking_date = data.data[0].booking_date;
      this.propertyDetailsforUpdate.vegetarian = data.data[0].vegetarian;
      this.propertyDetailsforUpdate.non_vegetarian = data.data[0].non_vegetarian;
      this.propertyDetailsforUpdate.advance = data.data[0].advance;
      this.propertyDetailsforUpdate.averagepriceofroom = data.data[0].averagepriceofroom;
      this.propertyDetailsforUpdate.alcoholprovision = data.data[0].alcohol;
      this.propertyDetailsforUpdate.foodprovision = data.data[0].foodprovisiontype;
      this.propertyDetailsforUpdate.decorationprovision = data.data[0].decorationprovisiontype;
      this.propertyDetailsforUpdate.otherpolicies = data.data[0].otherpolicytype;
      this.propertyDetailsforUpdate.hosteltermsandpolicy = data.data[0].hosteltermsandpolicyname;
      this.propertyDetailsforUpdate.playgroundtermsandpolicy = data.data[0].playgroundtermsandpolicyname;
      this.propertyDetailsforUpdate.hostelac = data.data[0].hostelacname;
      this.propertyDetailsforUpdate.hostelacprice = data.data[0].hostelacprice;
      this.propertyDetailsforUpdate.hostelnonac = data.data[0].hostelnonacname;
      this.propertyDetailsforUpdate.hostelnonacprice = data.data[0].hostelnonacprice;
      this.propertyDetailsforUpdate.eventfeaturesofvenue = data.data[0].eventfeaturesofvenuename;
      this.propertyDetailsforUpdate.hallprice = data.data[0].hallprice;
      this.propertyDetailsforUpdate.eventtypeprice = data.data[0].eventtypeprice;
      this.propertyDetailsforUpdate.playgroundfeatures = data.data[0].playgroundfeaturesname;
      this.propertyDetailsforUpdate.vehiclefeatures = data.data[0].vehiclefeaturesname;
      this.propertyDetailsforUpdate.propertyshownby = data.data[0].propertyshownby;
      this.propertyDetailsforUpdate.propertyshownbynumber = data.data[0].propertyshownbynumber;
      this.propertyDetailsforUpdate.smokingallowance = data.data[0].smokingallowance;
      this.propertyDetailsforUpdate.drinkingallowance = data.data[0].drinkingallowance;
      this.propertyDetailsforUpdate.propertyrent = data.data[0].propertyrent;
      this.propertyDetailsforUpdate.propertysecuritydeposit = data.data[0].propertysecuritydeposit;


      // changepropertytypes(propertyCategoryId) {
      //   this.optionPropertyType = null;
      //   this.property.propertyTypeId = null;
      //   this.property.preference = null;
      //   this.service.GetPropertyTypeByPropertyCategory(propertyCategoryId.value).subscribe((data) => {
      //     if (data.result == true) {
      //       this.optionPropertyType = data.data
      //     }
      //   });
      // }

      // changepreference(propertyTypeId) {
      //   this.preferences = null;
      //   this.property.preference = null;
      //   this.service.GetFeaturesByPropertyType(propertyTypeId.value).subscribe((data) => {
      //     if (data.result == true) {
      //       this.preferences = data.data;
      //     }
      //   });
      // }



      var facilityid = this.property.facilities_id;
      var facilityName = this.property.facilities;
      if (facilityid != '') {

        this.array = this.property.facilities_id
        for (var i = 0; i < facilityid.length; i++) {
          for (var j = i; j <= i; j++) {
            this.facilitiesArray.push({ "fid": facilityid[i], 'fname': facilityName[i], "fimg": this.imgApi + "/" + facilityName[i] + '.png' })
          }
        }

      }


      var amenityid = this.property.amenities_id;
      var amenityName = this.property.amenities;
      // var amenityValue = this.property.amenities_value;
      var amenitiesValue = this.property.amenities_value;
      this.service.getFacilitiesUserNotSelect(this.propertyId).subscribe((data) => {

        //alert(JSON.stringify(data))
        data.data.forEach(element => {
          let obj: any = { "fid": element.fid, "fname": element.facilityname, "fimg": this.imgApi + "/" + element.facilityname + '.png' }
          this.facilitiesGet3.push(obj);
          //  alert(JSON.stringify(this.facilitiesGet3))
        });
      })


      this.service.getAmenitiesUserNotSelect(this.propertyId).subscribe((data) => {
        // alert(JSON.stringify(data))
        this.amenitiesUserNotSelected = data.data;
        //alert(JSON.stringify(this.amenitiesUserNotSelected))
      });



      // amenar



      for (var i = 0; i < amenityid.length; i++) {
        this.amenar.push({ "amenid": amenityid[i], "amenname": amenityName[i], "amenvalue": amenitiesValue[i] })
        let amObj: Aminity;
        amObj = new Aminity();
        amObj.id = this.amenar[i].amenid;
        amObj.amName = this.amenar[i].amenvalue;

        this.amArray.push(amObj)
      }


    })

  }






  getBhkTypes() {
    this.service.getBhkTypes().subscribe((data) => {
      this.bhktype = data.data
    });
  }

  getBuildingTypes() {
    this.service.getBuildingTypes().subscribe((data) => {
      this.buildtype = data.data
    });
  }

  getFurnishedType() {
    this.service.getFurnishedType().subscribe((data) => {
      this.furnishedtype = data.data
    });
  }

  getFloorType() {
    this.service.getFloorType().subscribe((data) => {
      this.floortype = data.data
    });
  }

  getNoiseLevel() {
    this.service.getNoiseLevel().subscribe((data) => {
      this.noise = data.data
    });
  }

  getFeatures() {
    this.service.getFeatures().subscribe((data) => {
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
    this.service.getResidenceFurnishings().subscribe((data) => {
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
    this.service.getCommonFurnishings().subscribe((data) => {
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
    this.service.getShareTypes().subscribe((data) => {
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
    this.service.getFoodType().subscribe((data) => {
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
    this.service.getAlcoholType().subscribe((data) => {
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
    this.service.getFoodprovisionType().subscribe((data) => {
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
    this.service.getDecorationprovisionType().subscribe((data) => {
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
    this.service.getOtherpoliciesType().subscribe((data) => {
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
    this.service.getEventTypes().subscribe((data) => {
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
    this.service.getHallTypes().subscribe((data) => {
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
    this.service.getHosteltermsandpolicies().subscribe((data) => {
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
    this.service.getPlaygroundtermsandpolicies().subscribe((data) => {
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
    this.service.getEventFeaturesofvenue().subscribe((data) => {
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
    this.service.getHostelac().subscribe((data) => {
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
    this.service.getHostelnonac().subscribe((data) => {
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
    this.service.getPlaygroundfeatures().subscribe((data) => {
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
    this.service.getVehiclefeatures().subscribe((data) => {
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
    this.service.getPropertyshownby().subscribe((data) => {
      this.propertyshowby = data.data
    });
  }

  getSmoking() {
    this.service.getSmoking().subscribe((data) => {
      this.smoking = data.data
    });
  }

  getDrinking() {
    this.service.getDrinking().subscribe((data) => {
      this.drinking = data.data
    });
  }

  getPropertyrent() {
    this.service.getPropertyrent().subscribe((data) => {
      this.propertyrent = data.data
    });
  }

  getPropertysecuritydeposit() {
    this.service.getPropertysecuritydeposit().subscribe((data) => {
      this.securitydeposit1 = data.data
    });
  }

}