import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NearlukService } from 'src/app/services/nearluk.service';

@Component({
  selector: 'app-mytransactions',
  templateUrl: './mytransactions.component.html',
  styleUrls: ['./mytransactions.component.css']
})
export class MytransactionsComponent implements OnInit {

  myTransactionData: any = [];
  displayedColumns: string[] = ['SNo', 'PropertyName', 'OrderId','OrderAmount', 'OrderStatus', 'TransactionDate'];
  userId: any;
  constructor(
    private nearlukSevice: NearlukService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit() {
    this.getUserId();

  }

  getUserId() {
    this.spinner.show();
    if (sessionStorage.getItem('user') != null) {
      this.nearlukSevice.getSectionid(sessionStorage.getItem('user')).subscribe((data) => {
        this.userId = data[0].userid;
        this.mypropertyTransaction();

      });
    }
  }


  mypropertyTransaction() {
    this.nearlukSevice.mypropertyTransaction(this.userId).subscribe(data => {
      this.myTransactionData = data.data[0].mytransactions;
      this.spinner.hide();
      // alert(JSON.stringify(this.myTransactionData));
    }, error => {

    });
  }


}
