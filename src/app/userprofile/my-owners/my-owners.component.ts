import { Component, OnInit } from '@angular/core';
import { NearlukService } from 'src/app/services/nearluk.service';
import swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Meta, Title } from '@angular/platform-browser';



@Component({
  selector: 'app-my-owners',
  templateUrl: './my-owners.component.html',
  styleUrls: ['./my-owners.component.css']
})
export class MyOwnersComponent implements OnInit {
  userid: any;
  owners: any;
  roleid: any;
  page: any = 1;

  constructor(private nearlukservice: NearlukService,private toastr: ToastrService, private title: Title, private meta: Meta) {
    this.title.setTitle('NearLuk | Post a Property for Rent Online | Search Rental/Lease Properties in India - NearLuk ');
    this.meta.addTags([
      { name: 'description', content: 'Nearluk helps the owner to find potential and verified tenants to avail your rental property. Owner can post an advertisement in advance of its availability. | Nearluk helps the tenant to list down the best properties listed by the owner and agent, with exact information on the location, facilities and amenities provided by the party.  ' },
      { name: 'keywords', content: 'Nearluk helps the owner to find potential and verified tenants to avail your rental property. Owner can post an advertisement in advance of its availability. | Nearluk helps the tenant to list down the best properties listed by the owner and agent, with exact information on the location, facilities and amenities provided by the party. ' }
    ]);

   }


  moredetails(propertyid: any) {
    // this.router.navigate(['moredetails' + '/' + propertyid])
    window.open('moredetails' + '/' + propertyid)

  }
  deleteOwners(pid: any) {

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

       this.nearlukservice.deleteMyAgent(pid, this.userid).subscribe((data) => {
        this.toastr.success('Successfully removed from Owner');
      })
    this.ngOnInit();
      }
    })
  
  }


  onScroll() {
    this.page = this.page + 1;
    // alert(this.page)
    this.getOwners();
  }

  getOwners(){
    if (sessionStorage.getItem('user') != null) {
      this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userid = data[0].userid;
        this.roleid = data[0].roleid;
        this.nearlukservice.getMyOwners(this.userid,this.page).subscribe((data) => {
          this.owners = data.data;
          // console.log(this.owners)
        })
      });
    }
  }

  ngOnInit() {
    this.getOwners();
   
  }



}
