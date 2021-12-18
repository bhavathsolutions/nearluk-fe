import { Component, OnInit } from '@angular/core';
import { NearlukService } from '../../services/nearluk.service';
import { addagent, owneraddagent } from 'src/app/model/agent';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  requestnotifications: any;
  notifications: any;
  userid: any;
  roleid: any;
  addagents: addagent;
  addagent: owneraddagent;
  agentData: any;
  agentMoreDetails: boolean;

  constructor(private nearlukservice: NearlukService, private toastr: ToastrService, private router: Router, private title: Title, private meta: Meta) {
    this.title.setTitle('Notifications | flat for rent in Hyderabad | flat for rent | flat for rent in Delhi | flat for rent in Mumbai | flat for rent in Bangalore');
    this.meta.addTags([
      { name: 'description', content: 'The tenant or the owner can view any of the action done with the respective property. ' },
      { name: 'keywords', content: 'Villas, Farmlands, Nearluk, Industries, Workshops, Showrooms, Penthouses, Commercial spaces, Resorts' }
    ]);

    this.addagents = new addagent()
    this.addagent = new owneraddagent();

  }

  moredetails(a: any) {
    this.router.navigate(["/moredetails/" + a])
  }
  agentprofile(agentUserid) {


    this.nearlukservice.getUserDetails(agentUserid).subscribe((data) => {
      console.log(data)
      alert(JSON.stringify(data.data))
      this.agentData = data.data;

      this.agentMoreDetails = true;
    })

  }


  addAgentRes(touserid, propertyid, notification_id) {


    this.addagents.propertyid = propertyid
    this.addagents.fromuserid = this.userid;
    this.addagents.touserid = touserid;


    if (this.roleid == 2) {
      this.addagents.agentuserid = this.userid;
    }
    else {
      this.addagents.agentuserid = touserid;
    }
    this.addagents.status = 'accepted'

    this.addagents.notificationId = notification_id;


    this.nearlukservice.addagenttoowner(this.addagents).subscribe((data) => {
      this.toastr.success('Added Successfully');

      // this.notifyvisible = false;
      this.ngOnInit();
      this.get();
      // this.agentRequest();
    })
    this.ngOnInit();
    this.get();
  }

  reject(username, property_id, notification_id) {
    this.addagent.agentuserid = username;
    this.addagent.propertyid = property_id;
    this.addagent.status = 'rejected';
    this.nearlukservice.updateagentrequest(notification_id, this.addagent.status).subscribe((data) => {
      this.toastr.info('Rejected Successfully');

      this.ngOnInit();
    })
    this.ngOnInit();
  }

  get() {
    this.nearlukservice.getNotificationsbyuserid(this.userid).subscribe((data) => {
      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
        }
        else {
          if (data.data.length > 0) {
            this.notifications = data.data;
          }
          else {
          }
        }
      }
    })
  }



  getAgentRequest() {
    this.nearlukservice.getagentnotifications(this.userid).subscribe((data) => {

      if (data.result == false) {
        var res = data.message
      }
      else {
        if (data.data == "NDF") {
          var res = data.message
          // alert("No Data")

        }
        else {
          if (data.data.length > 0) {

            this.requestnotifications = data.data;

          }
          else {
          }
        }
      }
    })
  }

  ngOnInit() {

    this.nearlukservice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
      this.userid = data[0].userid;
      this.roleid = data[0].roleid;
      this.get();
      this.getAgentRequest();
    });




  }

}
