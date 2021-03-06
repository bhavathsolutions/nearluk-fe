
import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/model/login';
import { NearlukService } from 'src/app/services/nearluk.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alert } from 'selenium-webdriver';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  display: boolean = false;

  login: Login
  session: any;
  sess: any;
  ses: string;
  verifymail: boolean;

  constructor(private ls: NearlukService, private router: Router, private toastr: ToastrService, private app: AppComponent, private title: Title, private meta: Meta) {
    this.title.setTitle('Login | Property for lease | search property for rent | rent flats | villas | Commercial spaces |  House for rent | Flat for rent');
    this.meta.addTags([
      { name: 'description', content: 'Provide the required credentials to search or find the properties in NearLuk. ' },
      { name: 'keywords', content: 'post property, list your property,property listing website,free property ads posting sites,home buying sites,post property for rent,post ad for rent,property listing sites,advertise rental property for free,list property for rent,real estate portals,post house for rent,post free property ads online,post rental property for free,free post property,property posting sites,post free ad for rent,post free property ad,free rental property listing,housing search websites,free listing of property,listing home,advertisement for rental property' }
    ]);

    this.login = new Login()
  }

  cncl() {
    this.display = false;
    this.router.navigate(['home'])
    localStorage.removeItem('more')

  }

  registration() {  //for register button
    this.router.navigate(['registration'])
  }

  // Login() {
  //   this.ls.logingetalldetails(this.login).subscribe((data) => {
  //     //alert(JSON.stringify(data))
  //     this.session = data;
  //     //alert(JSON.stringify(this.session))
  //     if (this.session.result == true) {
  //       // alert(this.session.data[0].status)
  //       if (this.session.data[0].status == 'Verified') {
  //         sessionStorage.setItem('user', this.session.data[0].session)
  //         sessionStorage.setItem("loroolid", this.session.data[0].roleid)
  //         sessionStorage.setItem("loimage", this.session.image)
  //         this.app.msgcount = this.session.data[0].ancount;

  //         this.toastr.success('LogIn  successfully');
  //         if (localStorage.getItem('more')) {
  //           this.router.navigate(['moredetails/' + localStorage.getItem('more')])
  //           localStorage.removeItem('more')
  //         }
  //         else {
  //           this.router.navigate(['/home'])
  //         }
  //       }
  //       else {
  //         // alert(JSON.stringify(this.session))
  //         this.verifymail = true;
  //         this.toastr.error('Please check your mobile to activate');
  //       }
  //     }
  //     else {
  //       this.toastr.error(this.session.message);
  //     }
  //   })
  // }

  Login() {

    this.ls.logingetalldetails(this.login).subscribe((data) => {
      //alert(JSON.stringify(data))
      this.session = data;
      //alert(JSON.stringify(this.session))
      if (this.session.result == true) {
        // alert(this.session.data[0].status)
        if (this.session.data[0].status == 'Verified') {
          // window.location.reload();
          this.app.join(this.session.data[0].userid);
          sessionStorage.setItem('user', this.session.data[0].session);
          sessionStorage.setItem("loroolid", this.session.data[0].roleid);
          sessionStorage.setItem("loimage", this.session.image);
          localStorage.setItem('user', this.session.data[0].session);
          this.app.msgcount = this.session.data[0].ancount;
          // window.location.reload();
          this.router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            });

          this.toastr.success('LogIn  successfully');

          if (this.session.data[0].roleid == 2) {
            this.app.agent = true;
            this.app.owner = false;
          }
          else if (this.session.data[0].roleid == 3) {
            this.router.navigate(['adminhome'])
          }
          else {
            this.app.owner = true;
            this.app.owner = false;
          }
          if (localStorage.getItem('more')) {
            this.router.navigate(['moredetails/' + localStorage.getItem('more')])
            localStorage.removeItem('more')
          }
          else {
            this.router.navigate(['/home'])
          }


        }
        else {
          // alert(JSON.stringify(this.session))
          this.verifymail = true;
          this.toastr.error('Please check your mobile to activate');
        }
      }
      else {
        this.toastr.error(this.session.message);
      }

    })
  }


  verifyemail() {
    // alert(this.session.data[0].userid)
    this.ls.verifyemails(this.session.data[0].userid).subscribe((data) => {
      this.toastr.success('successful to send');
    })
  }

  ngDoCheck() {
    if (localStorage.getItem('user') == null) {
      localStorage.removeItem('user')
      sessionStorage.removeItem('user')
      // this.router.navigate(['/home'])
      this.ngOnInit();

    } else {
      this.router.navigate(['/home'])
    }

  }

  // ngOnInit() {
  //   if (sessionStorage.getItem('user')) {
  //     this.router.navigate(['/home'])
  //   }
  //   else {
  //     this.display = true; //for popup primeNg
  //   }

  // }
  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/home'])
    }
    else {
      this.display = true; //for popup primeNg
    }

  }

}