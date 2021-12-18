import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {


  favourites: any;
  userid: any;
  roleid: any;
  page: any = 1;
  showSpinner;


  constructor(private nearlukservice: NearlukService, private router: Router, private toastr: ToastrService, private title: Title, private meta: Meta) {
    this.title.setTitle('Favorites | houses for rent near me | houses for rent | duplex | rental properties | homes for rent near me | independent house ');
    this.meta.addTags([
      { name: 'description', content: 'The user can add interested properties to Add to Favorites” and user can easily view further.' },
      { name: 'keywords', content: 'flat for rent near me,  Nearluk, rented apartment, Villas, flat for rent, 1 bhk flat for rent, Hostels, Paying Guest, men s hostel near me' }
    ]);

    this.showSpinner = true;

  }

  moredetails(propertyid: any) {
    this.router.navigate(['moredetails' + '/' + propertyid])
  }

  delete(propertyid: any) {


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

        this.nearlukservice.removefav(propertyid, this.userid).subscribe((data) => {
          this.toastr.success('Successfully removed from favourites');
        })
        this.ngOnInit()
      }
    })



  }



  onScroll() {
    this.page = this.page + 1;
    this.infinite();
  }
  infinite() {



    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;

        this.nearlukservice.getFavouriteDetails(this.userid, this.page).subscribe((data) => {
          this.favourites = data.data;
          this.showSpinner = false;

        })

      });
    }



  }

  ngOnInit() {
    // var userid = 1;

    this.infinite();
  }
}
